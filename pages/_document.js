import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to Google Fonts early */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Preload critical above-fold images */}
          <link rel="preload" as="image" href="/images/1016_opt.jpg" />
          <link rel="preload" as="image" href="/images/Apple-Logo.png" />
          <link rel="preload" as="image" href="/images/logo.png" />

          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Michroma:wght@400;700;900&display=swap"
            as="style"
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
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
