import * as XLSX from 'xlsx';

const PRODUCTS = [
  { Category: 'Preservation Services', Name: 'Keepsake Preservation', Price: '$149.00', 'Price ID': 'price_1Tk0cNLfTuG5tMiXdpbNNHIq', 'Product ID': 'prod_UjTZ2e4Hmj5szd', Description: 'Jewelry, small keepsakes & compact paperweights. Includes pendant/ring/earring, compact paperweight block, standard UV-resistant resin, documentation photos. 12–16 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/order' },
  { Category: 'Preservation Services', Name: 'Heirloom Preservation', Price: '$279.00', 'Price ID': 'price_1Tk0cNLfTuG5tMiXmtvqhwHS', 'Product ID': 'prod_UjTZPm3A19Fn1Y', Description: 'Bouquets, orbs, shadow boxes & mid-size displays. Includes full bouquet preservation, orb or shadow box format, multi-layer premium resin, high-gloss polish finish, engraved date plate. 8–12 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/order' },
  { Category: 'Preservation Services', Name: 'Legacy Preservation', Price: '$499.00', 'Price ID': 'price_1Tk0cNLfTuG5tMiX9cXwvIxz', 'Product ID': 'prod_UjTZ1OjEwa1zZ3', Description: 'Custom sculptures, large tabletop art & legacy pieces. Includes custom sculptural form, dedicated artisan, archival documentation, white-glove handling, custom display pedestal, lifetime guarantee. 4–6 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/order' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Pendant', Price: '$199.00', 'Price ID': 'price_1TjsvJLfTuG5tMiXnRFpVqyp', 'Product ID': 'prod_UjLcqTq6HjkvbP', Description: 'Cremation ashes encased in a wearable resin pendant. Includes ashes or flower petal infusion, sterling silver bail, choice of shape & color tint, gift box. 6–8 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/jewelry' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Ring', Price: '$249.00', 'Price ID': 'price_1TjsvJLfTuG5tMiXVEvjTgpo', 'Product ID': 'prod_UjLcJE2vxqzLPR', Description: 'Ashes set in a hand-cast resin band. Includes ashes or botanical infusion, hypoallergenic resin band, custom sizing, polished finish. 6–8 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/jewelry' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Jewelry Set', Price: '$399.00', 'Price ID': 'price_1TjsvJLfTuG5tMiXEQlvOl8B', 'Product ID': 'prod_UjLctvnPlbjhBy', Description: 'Matching pendant and ring from the same memorial. Includes pendant + ring from same ashes, coordinated design, custom sizing & color tint, keepsake gift box. 8–10 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/jewelry' },
  { Category: 'Studio Collection', Name: 'Standard Notebook', Price: '$75.00', 'Price ID': '', 'Product ID': '', Description: 'Hand-poured resin cover with preserved botanicals. Includes botanical & floral resin cover, crystal-clear UV resin, A5 lined journal, one-of-a-kind design. 3–5 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/notebooks' },
  { Category: 'Studio Collection', Name: 'Custom Notebook', Price: '$100.00', 'Price ID': '', 'Product ID': '', Description: 'Personalized with your own flowers, name, or date. Everything in Standard plus your supplied botanicals or name, custom design consultation, engraved spine option. 4–6 week turnaround.', 'Order URL': 'https://unforgottenpour.polsia.app/notebooks' },
];

export default function DownloadCatalog() {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(PRODUCTS);
    // Set column widths
    ws['!cols'] = [
      { wch: 22 }, // Category
      { wch: 24 }, // Name
      { wch: 10 }, // Price
      { wch: 36 }, // Price ID
      { wch: 30 }, // Product ID
      { wch: 80 }, // Description
      { wch: 40 }, // Order URL
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'UnforgottenPour-Product-Catalog.xlsx');
  };

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F2F2F2', fontFamily: 'Inter Tight, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Product Catalog</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px' }}>Download Your Catalog</h1>
        <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', marginBottom: '40px' }}>All 8 products with prices, descriptions, IDs, and order URLs.</p>
        <button onClick={handleDownload}
          style={{ background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
          Download Excel File
        </button>
      </div>
    </div>
  );
}