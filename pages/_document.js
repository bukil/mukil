import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    const isHome = this.props.__NEXT_DATA__.page === '/'
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to Google Fonts early */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {isHome && (
            <link rel="preload" href="/fonts/Ogg-Roman.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          )}
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
