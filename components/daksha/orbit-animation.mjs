// Original vector animation: two orbital arcs sweep around the spacecraft.
// Kept as code so it needs no external asset request or third-party artwork.
const animated = (from, to) => ({
  a: 1,
  k: [
    {
      t: 0,
      s: [from],
      e: [to],
      o: { x: [0.33], y: [0] },
      i: { x: [0.67], y: [1] }
    },
    { t: 119, s: [to] }
  ]
})
const ring = (index, size, color, rotation) => ({
  ty: 4,
  ind: index,
  nm: `Orbit arc ${index}`,
  ip: 0,
  op: 120,
  st: 0,
  ks: {
    o: { a: 0, k: 100 },
    r: animated(rotation, rotation + 160),
    p: { a: 0, k: [256, 256, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] }
  },
  shapes: [
    { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [size, size] }, d: 1 },
    {
      ty: 'st',
      c: { a: 0, k: [...color, 1] },
      o: { a: 0, k: 80 },
      w: { a: 0, k: 1.25 },
      lc: 2,
      lj: 2
    },
    {
      ty: 'tm',
      s: { a: 0, k: 4 },
      e: animated(12, 88),
      o: { a: 0, k: 0 },
      m: 1
    }
  ]
})
export const orbitAnimation = {
  v: '5.12.2',
  fr: 60,
  ip: 0,
  op: 120,
  w: 512,
  h: 512,
  nm: 'Daksha orbital transition',
  ddd: 0,
  assets: [],
  layers: [ring(1, 458, [0.27, 0.73, 1], 0), ring(2, 400, [0.65, 0.51, 1], 180)]
}
