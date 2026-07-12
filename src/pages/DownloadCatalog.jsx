import * as XLSX from 'xlsx';
import { GLOBES, SHAPES, NOTEBOOK, KEYCHAIN, JEWELRY } from '@/data/products';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const PRODUCTS = [
  ...GLOBES.map(g => ({
    Category: 'Resin Globes',
    Name: g.name,
    Size: g.size,
    Price: `$${g.price.toFixed(2)}`,
    'Price ID': g.priceId,
    'Product ID': g.productId,
    'Order URL': '/order',
  })),
  ...SHAPES.map(s => ({
    Category: 'Shaped Pieces',
    Name: s.name,
    Size: s.size,
    Price: `$${s.price.toFixed(2)}`,
    'Price ID': s.priceId,
    'Product ID': s.productId,
    'Order URL': '/order',
  })),
  {
    Category: 'Studio Collection',
    Name: NOTEBOOK.name,
    Size: NOTEBOOK.size,
    Price: `$${NOTEBOOK.price.toFixed(2)}`,
    'Price ID': NOTEBOOK.priceId,
    'Product ID': NOTEBOOK.productId,
    'Order URL': '/notebooks',
  },
  {
    Category: 'Keychains',
    Name: KEYCHAIN.name,
    Size: KEYCHAIN.size,
    Price: `$${KEYCHAIN.price.toFixed(2)}`,
    'Price ID': KEYCHAIN.priceId,
    'Product ID': KEYCHAIN.productId,
    'Order URL': '/order',
  },
  ...JEWELRY.map(j => ({
    Category: 'Memorial Jewelry',
    Name: j.name,
    Size: 'N/A',
    Price: `$${j.price.toFixed(2)}`,
    'Price ID': j.priceId,
    'Product ID': j.productId,
    'Order URL': j.link,
  })),
];

export default function DownloadCatalog() {
  useMetaDescription(
    'Download the Unforgotten Pour product catalog, resin globes, shaped blocks, notebooks, and memorial jewelry with full pricing and product details.'
  );
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(PRODUCTS);
    ws['!cols'] = [
      { wch: 20 }, // Category
      { wch: 28 }, // Name
      { wch: 22 }, // Size
      { wch: 10 }, // Price
      { wch: 36 }, // Price ID
      { wch: 30 }, // Product ID
      { wch: 16 }, // Order URL
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
        <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', marginBottom: '40px' }}>{PRODUCTS.length} products with prices, sizes, IDs, and order URLs.</p>
        <button onClick={handleDownload}
          style={{ background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
          Download Excel File
        </button>
      </div>
    </div>
  );
}