import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { trackViewContent } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import PullToRefresh from '@/components/PullToRefresh';

const CATEGORIES = [
{
  id: 'wedding',
  label: 'Wedding & Event Florals',
  num: '01',
  title: 'Wedding & Event Florals',
  desc: 'Bridal bouquets, boutonnieres, corsages, and ceremonial arrangements, preserved in crystal-clear resin blocks, orbs, and jewelry. Your wedding flowers deserve to outlast the day.',
  items: ['Bridal bouquets', 'Boutonnieres & corsages', 'Ceremonial arrangements', 'Pressed petals & confetti', 'Champagne corks & ribbons'],
  images: [
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/c74e8c31-759e-4744-80ef-b6034f08f266.png', label: 'Featured Work' },
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/df404ac9-7888-46cb-b538-26cc32f7d3cd.png', label: '' },
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/3221f836-1f71-4e89-badd-cafcecdc7e3c.jpg', label: '' },
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/e55cf420-7a88-49d3-832f-d4f36082ff02.jpg', label: '' },
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/9064f719-d32e-4000-83af-a647500268de.jpg', label: '' },
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/451b147d-bb59-4a8f-92cf-34bf41f533b7.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/0cacf85d9_517568015_10166096206013747_799119564642891177_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/f7002181a_494216822_1201457428655811_7052543975862834227_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/fe1d7044d_520873874_1277968801004673_4128750413421443177_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/8f5dc7f1e_523835742_1277969641004589_6444637789351428028_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/9d9291a4a_556528575_1342912871176932_7211617229588252135_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/98508d6a5_596859509_1408934014574817_8786174887677198184_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/a25ae7b94_597624556_1408933964574822_9039555353428654077_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/eb45a883f_600306908_1413993667402185_4026996115270414416_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/ca3b9898f_600276829_1415445290590356_8840858216308380883_n.jpg', label: '' }]

},
{
  id: 'memorial',
  label: 'Memorial Keepsakes',
  num: '02',
  title: 'Memorial Keepsakes',
  desc: 'Funeral flowers, cremation ashes, dried botanicals from gravesites. A permanent, tangible way to hold someone close, transformed into something beautiful you can keep forever.',
  items: ['Funeral florals', 'Cremation ashes', 'Graveside botanicals', 'Pet fur & paw prints', 'Handwritten letters'],
  images: [
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/53e2d4d9-1b21-47bb-ad2d-34ed75b18430.png', label: 'Memorial Collection' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/bc52c2c8d_598697365_1413994444068774_6730136808041610728_n.jpg', label: '' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/1e09b91d1_671284273_1524234836378067_8292117622520524363_n.jpg', label: '' }]

},
{
  id: 'spheres',
  label: 'Resin Spheres',
  num: '04',
  title: 'Floral Resin Spheres',
  desc: 'Perfect crystal spheres encasing preserved roses, baby\'s breath, lavender, and eucalyptus. Each orb is hand-poured and polished to a glass-like finish, a complete floral world suspended in time, striking as décor and meaningful as keepsake.',
  items: ['Bridal rose arrangements', 'Baby\'s breath & lavender', 'Eucalyptus & botanicals', 'Blush, mauve & peach palettes', 'Custom floral combinations'],
  images: [
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/563e26a68_373b4dc6-ac8c-43bb-888f-db4b8c87d5b33.png', label: '' }]

},
{
  id: 'jewelry',
  label: 'Memorial Jewelry',
  num: '05',
  title: 'Memorial Jewelry',
  desc: 'Cremation ashes and preserved botanicals set into wearable resin pendants, rings, and earrings, intimate, portable keepsakes you can carry every day.',
  items: ['Resin pendants', 'Memorial rings', 'Earring sets', 'Ashes & petal infusion', 'Custom shapes & color tints'],
  images: [
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/b6cd0ae4c_517298203_10166088166648747_5996983620115148223_n.jpg', label: '' }]

},
{
  id: 'notebooks',
  label: 'Studio Notebooks',
  num: '06',
  title: 'Hand-Poured Notebooks',
  desc: 'A5 journals with hand-poured resin covers featuring preserved botanicals and florals, one-of-a-kind functional art for your desk or journaling practice.',
  items: ['Botanical resin covers', 'Crystal-clear UV resin', 'A5 lined journals', 'One-of-a-kind designs', 'Custom flower & name options'],
  images: [
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/1df70194a_Firefly_GeminiFlash_customresin4notebooks522599.png', label: 'Botanical Collection' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/179c733c7_Firefly_GeminiFlash_customresinnotebooks6682.png', label: 'Custom Name Journals' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/f695e7c3e_Firefly_GeminiFlash_customresinnotebooks522599.png', label: "Nature's Notes" }]

},
{
  id: 'milestone',
  label: 'Milestone Artifacts',
  num: '03',
  title: 'Milestone Artifacts',
  desc: "Baby's first shoes, hospital wristbands, locks of hair. The small objects that mark enormous moments, now preserved in museum-quality resin to last for generations.",
  items: ["Baby's first shoes", 'Hospital wristbands', 'Locks of hair', 'First teeth & keepsakes', 'Graduation & achievement items'],
  images: [
  { url: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/b72be2d5-7e0a-422a-9fdb-dafda1a53c4a.png', label: 'Milestone Series' }]

}];


const FORMATS = [
{ icon: '◎', name: 'Jewelry', desc: 'Pendants, rings, and earrings, wear your memory every day.' },
{ icon: '▪', name: 'Paperweight', desc: 'A polished block for desk or shelf display.' },
{ icon: '⬜', name: 'Shadow Box', desc: 'Framed resin inlay paired with photographs or mementos.' },
{ icon: '○', name: 'Orb', desc: 'A perfect sphere suspended in time, striking as décor.' },
{ icon: '◆', name: 'Tabletop Art', desc: 'Custom sculptural pieces made to anchor a room.' }];


export default function Portfolio() {
  useMetaDescription(
    'Explore our portfolio of custom resin preservation pieces, wedding bouquets, memorial keepsakes, and milestone artifacts cast in crystal-clear resin.'
  );
  const [activeTab, setActiveTab] = useState('wedding');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];
    trackViewContent({
      contentId: cat.id,
      contentName: cat.title,
      contentCategory: 'Portfolio',
      price: 50
    });
  }, [activeTab]);

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      <PullToRefresh onRefresh={handleRefresh}>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', padding: '120px 24px 80px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '32px' }}>
          What We Preserve
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '24px' }}>
          Every category.<br />Every memory.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          From bridal bouquets to memorial tributes to milestone keepsakes, real pieces from our studio, each one handcrafted and unique.
        </p>
      </section>

      {/* Tabs */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0D0D10' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {CATEGORIES.map((cat) =>
          <button key={cat.id} onClick={() => setActiveTab(cat.id)}
          style={{ padding: '18px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', borderBottom: activeTab === cat.id ? '2px solid #C8681E' : '2px solid transparent', color: activeTab === cat.id ? '#F2F2F2' : 'rgba(242,242,242,0.4)', transition: 'color 0.2s', fontFamily: 'Inter Tight, sans-serif' }}>
              {cat.label}
            </button>
          )}
        </div>
      </div>

      {/* Category Content */}
      {CATEGORIES.filter((c) => c.id === activeTab).map((cat) =>
      <section key={`${cat.id}-${refreshKey}`} style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '60px', flexWrap: 'wrap' }}>
            
            <div style={{ paddingTop: '12px' }}>
              
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#F2F2F2' }}>{cat.title}</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
              {cat.images.length === 0 &&
            <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16/10', background: '#111113', border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(242,242,242,0.25)', fontSize: '13px', letterSpacing: '0.05em' }}>
                  Photos coming soon
                </div>
            }
              {cat.images.map((img, i) =>
            <div key={i} style={{ position: 'relative', gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
                  <img src={img.url} alt={img.label} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: i === 0 ? '16/10' : '1' }} />
                  {img.label &&
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(10,10,12,0.85), transparent)' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(242,242,242,0.7)', letterSpacing: '0.05em' }}>{img.label}</span>
                    </div>
              }
                </div>
            )}
            </div>

            {/* Details */}
            <div style={{ paddingLeft: '16px' }}>
              <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.75, marginBottom: '28px' }}>{cat.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '36px' }}>
                {cat.items.map((item) =>
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: 'rgba(242,242,242,0.6)' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C8681E', flexShrink: 0 }} />
                    {item}
                  </li>
              )}
              </ul>
              <Link to={`/order?category=${cat.id}`} style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 28px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Preserve Mine →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Available Formats */}
      <section style={{ background: '#0D0D10', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: '#F2F2F2', marginBottom: '48px' }}>
            How do you want to display it?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2px' }}>
            {FORMATS.map((f) =>
            <div key={f.name} style={{ background: '#111113', padding: '28px 24px' }} className="rounded-[20px]">
                <div style={{ fontSize: '20px', marginBottom: '12px', opacity: 0.5 }}>{f.icon}</div>
                
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.4)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            )}
          </div>
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 600, color: '#F2F2F2', marginBottom: '12px' }}>Ready to start?</h3>
            <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', marginBottom: '28px' }}>Tell us what you have and we'll take it from there.</p>
            <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
              Begin My Order
            </Link>
          </div>
        </div>
      </section>
      </PullToRefresh>
    </div>);

}