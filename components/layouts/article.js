import Head from 'next/head'
import { GridItemStyle } from '../grid-item'

const Layout = ({ children, title }) => {
  const t = `${title} - Mukil`
  return (
    <article style={{ position: 'relative' }}>
      <>
        {title && (
          <Head>
            <title>{t}</title>
            <meta name="twitter:title" content={t} />
            <meta property="og:title" content={t} />
            {/* Custom fonts are added in pages/_document.js to satisfy @next/next/no-page-custom-font */}
          </Head>
        )}
        {children}

        <GridItemStyle />
      </>
    </article>
  )
}

export default Layout
