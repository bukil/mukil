import { useId } from 'react'

export default function ChromeLogo({ animated }) {
  const id = useId().replace(/:/g, '')
  const paint = name => `url(#${id}-${name})`
  return (
    <svg viewBox="0 0 611 604" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={id + '-studio'} x1="0" y1="0" x2=".55" y2="1"
          gradientUnits="objectBoundingBox" spreadMethod="reflect">
          <stop stopColor="#b6cadd" />
          <stop offset=".20" stopColor="#f7fcff" />
          <stop offset=".32" stopColor="#536e88" />
          <stop offset=".39" stopColor="#16253b" />
          <stop offset=".47" stopColor="#7d93a4" />
          <stop offset=".50" stopColor="#ffffff" />
          <stop offset=".56" stopColor="#ddd0bc" />
          <stop offset=".74" stopColor="#687b8c" />
          <stop offset="1" stopColor="#e2eff4" />
          {animated && <animateTransform attributeName="gradientTransform" type="translate"
            values="-.12 -.18;.12 .18;-.12 -.18" dur="9s" repeatCount="indefinite"
            calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />}
        </linearGradient>
        <filter id={id + '-folds'} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".003 .005" numOctaves="2" seed="8" result="folds" />
          <feDisplacementMap in="SourceGraphic" in2="folds" scale="145" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={id + '-rim'} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feSpecularLighting surfaceScale="5" specularConstant=".85" specularExponent="15" lightingColor="#ffffff">
            <feDistantLight azimuth="230" elevation="43" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <rect x="-80" y="-80" width="771" height="764" fill={paint('studio')} filter={paint('folds')} />
      <image href="/images/daksha/foil-cards/daksha.svg" width="611" height="604" filter={paint('rim')} />
    </svg>
  )
}
