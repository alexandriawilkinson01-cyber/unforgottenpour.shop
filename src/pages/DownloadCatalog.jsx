import * as XLSX from 'xlsx';

const PRODUCTS = [
  { Category: 'Preservation Services', Name: 'Keepsake Preservation', Price: '$104.00', 'Price ID': 'price_1Tmv61LfTuG5tMiXGywKqPx5', 'Product ID': 'prod_UjTZ2e4Hmj5szd', Description: 'Jewelry, small keepsakes & compact paperweights. Includes pendant/ring/earring, compact paperweight block, standard UV-resistant resin, documentation photos. 4–6 week turnaround.', 'Order URL': '/order' },
  { Category: 'Preservation Services', Name: 'Heirloom Preservation', Price: '$195.00', 'Price ID': 'price_1Tmv61LfTuG5tMiXKlElIXep', 'Product ID': 'prod_UjTZPm3A19Fn1Y', Description: 'Bouquets, orbs, shadow boxes & mid-size displays. Includes full bouquet preservation, orb or shadow box format, multi-layer premium resin, high-gloss polish finish, engraved date plate. 4–6 week turnaround.', 'Order URL': '/order' },
  { Category: 'Preservation Services', Name: 'Legacy Preservation', Price: '$349.00', 'Price ID': 'price_1Tmv61LfTuG5tMiXFpy3voxJ', 'Product ID': 'prod_UjTZ1OjEwa1zZ3', Description: 'Custom sculptures, large tabletop art & legacy pieces. Includes custom sculptural form, dedicated artisan, archival documentation, white-glove handling, custom display pedestal, lifetime guarantee. 4–6 week turnaround.', 'Order URL': '/order' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Pendant', Price: '$139.00', 'Price ID': 'price_1Tmv61LfTuG5tMiXNtM0RM28', 'Product ID': 'prod_UjLcqTq6HjkvbP', Description: 'Cremation ashes encased in a wearable resin pendant. Includes ashes or flower petal infusion, sterling silver bail, choice of shape & color tint, gift box. 4–6 week turnaround.', 'Order URL': '/jewelry' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Ring', Price: '$174.00', 'Price ID': 'price_1Tmv61LfTuG5tMiX0ho1eE9K', 'Product ID': 'prod_UjLcJE2vxqzLPR', Description: 'Ashes set in a hand-cast resin band. Includes ashes or botanical infusion, hypoallergenic resin band, custom sizing, polished finish. 4–6 week turnaround.', 'Order URL': '/jewelry' },
  { Category: 'Memorial Jewelry', Name: 'Memorial Jewelry Set', Price: '$279.00', 'Price ID': 'price_1Tmv61LfTuG5tMiXN2s2m11s', 'Product ID': 'prod_UjLctvnPlbjhBy', Description: 'Matching pendant and ring from the same memorial. Includes pendant + ring from same ashes, coordinated design, custom sizing & color tint, keepsake gift box. 4–6 week turnaround.', 'Order URL': '/jewelry' },
  { Category: 'Studio Collection', Name: 'Standard Notebook', Price: '$52.00', 'Price ID': 'price_1Tmv6bLfTuG5tMiXY7CSGzxE', 'Product ID': 'prod_UmU495teWtja2K', Description: 'Hand-poured resin cover with preserved botanicals. Includes botanical & floral resin cover, crystal-clear UV resin, A5 lined journal, one-of-a-kind design. 4–6 week turnaround.', 'Order URL': '/notebooks' },
  { Category: 'Studio Collection', Name: 'Custom Notebook', Price: '$70.00', 'Price ID': 'price_1Tmv6bLfTuG5tMiXamw6lm5g', 'Product ID': 'prod_UmU4Ivp0kGtj2O', Description: 'Personalized with your own flowers, name, or date. Everything in Standard plus your supplied botanicals or name, custom design consultation, engraved spine option. 4–6 week turnaround.', 'Order URL': '/notebooks' },
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
    <div style={{ background: '#FBF7F4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A3B3F', fontFamily: 'Inter Tight, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C47B6D', marginBottom: '20px' }}>Product Catalog</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '16px' }}>Download Your Catalog</h1>
        <p style={{ fontSize: '15px', color: 'rgba(74,59,63,0.45)', marginBottom: '40px' }}>All 8 products with prices, descriptions, IDs, and order URLs.</p>
        <button onClick={handleDownload}
          style={{ background: '#C47B6D', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
          Download Excel File
        </button>
      </div>
    </div>
  );
}