import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    const isDaksha = this.props.__NEXT_DATA__.page === '/daksha-in-orbit'
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to Google Fonts early */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Shared above-fold assets; page-specific images are preloaded by their page. */}
          {!isDaksha && (
            <>
              <link rel="preload" as="image" href="/muk.svg" />
              <link rel="preload" href="/fonts/GT-Walsheim-Pro-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
              <link rel="preload" href="/fonts/GT-Walsheim-Pro-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            </>
          )}

          {/* Discover these directly instead of through a CSS @import chain. */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" />
          <link
            href="https://fonts.googleapis.com/css2?family=Michroma:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
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
