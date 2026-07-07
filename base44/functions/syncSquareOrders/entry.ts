import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('square');

    // Fetch merchant locations first (required by SearchOrders)
    const locRes = await fetch('https://connect.squareup.com/v2/locations', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-12-18',
      },
    });
    if (!locRes.ok) {
      const errBody = await locRes.text();
      return Response.json({ error: `Square locations error: ${locRes.status} ${errBody}` }, { status: 502 });
    }
    const locData = await locRes.json();
    const locationIds = (locData.locations || []).map(l => l.id);
    if (locationIds.length === 0) {
      return Response.json({ success: true, synced: 0, total: 0, message: 'No Square locations found' });
    }

    // Search for recent Square orders (COMPLETED and OPEN states)
    const squareRes = await fetch('https://connect.squareup.com/v2/orders/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-12-18',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 200,
        location_ids: locationIds,
        query: {
          filter: {
            state_filter: { states: ['COMPLETED', 'OPEN'] }
          },
          sort: { sort_field: 'CREATED_AT', sort_order: 'DESC' }
        }
      }),
    });

    if (!squareRes.ok) {
      const errBody = await squareRes.text();
      return Response.json({ error: `Square API error: ${squareRes.status} ${errBody}` }, { status: 502 });
    }

    const squareData = await squareRes.json();
    const squareOrders = squareData.orders || [];

    if (squareOrders.length === 0) {
      return Response.json({ success: true, synced: 0, total: 0 });
    }

    // Get existing Square order IDs from our DB to avoid duplicates
    const existingOrders = await base44.asServiceRole.entities.Order.filter({});
    const existingSquareIds = new Set(
      existingOrders.filter(o => o.square_order_id).map(o => o.square_order_id)
    );

    const newSquareOrders = squareOrders.filter(so => !existingSquareIds.has(so.id));

    if (newSquareOrders.length === 0) {
      return Response.json({ success: true, synced: 0, total: squareOrders.length });
    }

    // Batch fetch customer details for orders with customer_id
    const customerIds = [...new Set(
      newSquareOrders.map(o => o.customer_id).filter(Boolean)
    )];

    const customerMap = {};
    if (customerIds.length > 0) {
      try {
        const custRes = await fetch('https://connect.squareup.com/v2/customers/batch-retrieve', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Square-Version': '2024-12-18',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customer_ids: customerIds.slice(0, 100) }),
        });
        if (custRes.ok) {
          const custData = await custRes.json();
          (custData.customers || []).forEach(c => { customerMap[c.id] = c; });
        }
      } catch (e) {
        // Continue without customer data
      }
    }

    // Map Square orders to our Order entity
    const orderRecords = newSquareOrders.map(so => {
      const product = (so.line_items || [])
        .map(li => `${li.quantity}x ${li.name}`)
        .join(', ') || 'Square Order';

      const totalCents = so.total_money?.amount || 0;
      const amount = totalCents / 100;
      const currency = so.total_money?.currency || 'USD';

      const customer = so.customer_id ? customerMap[so.customer_id] : null;
      const fulfillment = so.fulfillments?.[0];
      const recipient = fulfillment?.pickup_details?.recipient || fulfillment?.shipment_details?.recipient;

      const customer_name = customer?.given_name
        ? `${customer.given_name} ${customer.family_name || ''}`.trim()
        : recipient?.display_name || 'Square Customer';

      const customer_email = customer?.email || recipient?.email_address || '';

      const status = so.state === 'COMPLETED' ? 'delivered' : 'new';

      const record = {
        customer_name,
        amount,
        currency,
        product,
        square_order_id: so.id,
        status,
      };
      if (customer_email) record.customer_email = customer_email;
      return record;
    });

    if (orderRecords.length === 0) {
      return Response.json({ success: true, synced: 0, total: squareOrders.length });
    }

    const created = await base44.asServiceRole.entities.Order.bulkCreate(orderRecords);

    return Response.json({
      success: true,
      synced: created.length,
      total: squareOrders.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});