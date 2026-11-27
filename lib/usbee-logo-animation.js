const position = { a: 0, k: [56, 44, 0] }
const easeIn = { x: [0.2], y: [0] }
const easeOut = { x: [0.25], y: [1] }

export const usbeeLogoAnimation = {
  v: '5.12.2',
  fr: 60,
  ip: 0,
  op: 61,
  w: 112,
  h: 88,
  assets: [{ id: 'logo', w: 72, h: 55, u: '/images/usbee/', p: 'logo.svg' }],
  layers: [{
    ind: 1,
    ty: 2,
    refId: 'logo',
    ip: 0,
    op: 61,
    st: 0,
    ks: {
      a: { a: 0, k: [36, 27.5, 0] },
      p: position,
      r: { a: 0, k: 0 },
      o: { a: 0, k: 100 },
      s: {
        a: 1,
        k: [
          { t: 0, s: [92, 92, 100], i: easeIn, o: easeOut },
          { t: 37, s: [150, 150, 100], i: easeIn, o: easeOut },
          { t: 60, s: [135, 135, 100] },
        ],
      },
    },
  }],
}
