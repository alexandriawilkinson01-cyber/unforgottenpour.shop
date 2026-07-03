export const GLOBES = [
  { id: 'globe-4', name: '4" Resin Globe', size: '4" diameter', price: 150, priceId: 'price_1TozQ5LfTuG5tMiXzTI8UePr', productId: 'prod_UocfkFTxbJ6nxY' },
  { id: 'globe-3', name: '3" Resin Globe', size: '3" diameter', price: 125, priceId: 'price_1TozQ5LfTuG5tMiXmlbFzmr8', productId: 'prod_UocfFpY8cHh1Zg' },
  { id: 'globe-2.5', name: '2.5" Resin Globe', size: '2.5" diameter', price: 100, priceId: 'price_1TozQ5LfTuG5tMiXomSipXwA', productId: 'prod_UocfcrqLO9QzEC' },
  { id: 'globe-2', name: '2" Resin Globe', size: '2" diameter', price: 75, priceId: 'price_1TozQ5LfTuG5tMiXddnd3rN5', productId: 'prod_UocfKCOPqrBS5j' },
  { id: 'globe-1.7', name: '1.7" Resin Globe', size: '1.7" diameter', price: 65, priceId: 'price_1TozQ5LfTuG5tMiXdjYkHcmz', productId: 'prod_UocfVewHoRbU5B' },
  { id: 'globe-1.3', name: '1.3" Resin Globe', size: '1.3" diameter', price: 60, priceId: 'price_1TozQ5LfTuG5tMiX0qlLvwzo', productId: 'prod_Uocf3X48qxtt4I' },
  { id: 'globe-0.9', name: '0.9" Resin Globe', size: '0.9" diameter', price: 50, priceId: 'price_1TozQ5LfTuG5tMiXOuFn1bep', productId: 'prod_UocfiaOykFER4R' },
];

export const SHAPES = [
  { id: 'square', name: 'Square Block', size: '6.6" × 6.6"', price: 150, priceId: 'price_1TozQ5LfTuG5tMiXms1wpHDl', productId: 'prod_UocfuLsBdF8b0B' },
  { id: 'hexagon', name: 'Hexagon Block', size: '9.1" × 7.8" × 2"', price: 250, priceId: 'price_1TozQ5LfTuG5tMiXkHVQ2f0K', productId: 'prod_UocfbSli19H2yI' },
  { id: 'heart', name: 'Heart Shaped', size: '8.3" × 8" × 2"', price: 250, priceId: 'price_1TozQ5LfTuG5tMiX1iza816K', productId: 'prod_Uocf0y5JugrPoM' },
  { id: 'ornaments', name: 'Small Circle Ornaments', size: 'Set of 4', price: 150, priceId: 'price_1TozQ5LfTuG5tMiXDOointYz', productId: 'prod_UocfswGEICFHwg' },
];

export const NOTEBOOK = { id: 'notebook', name: 'Resin Notebook', size: 'A5 journal', price: 100, priceId: 'price_1TozQ5LfTuG5tMiXUfkbrFra', productId: 'prod_UocfTeAeFPfn52' };

export const JEWELRY = [
  { id: 'pendant', name: 'Memorial Pendant', price: 209, priceId: 'price_1TncnOLfTuG5tMiXlgKFswNl', productId: 'prod_UjLcqTq6HjkvbP', link: '/jewelry' },
  { id: 'ring', name: 'Memorial Ring', price: 261, priceId: 'price_1TncnOLfTuG5tMiXLkAZaseC', productId: 'prod_UjLcJE2vxqzLPR', link: '/jewelry' },
  { id: 'set', name: 'Memorial Jewelry Set', price: 419, priceId: 'price_1TncnOLfTuG5tMiXixbr0SOg', productId: 'prod_UjLctvnPlbjhBy', link: '/jewelry', featured: true },
];

export const ALL_ITEMS = [...GLOBES, ...SHAPES, NOTEBOOK, ...JEWELRY];