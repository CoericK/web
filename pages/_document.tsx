import Document, { Html, Head, Main, NextScript } from "next/document";
import * as React from "react";

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />

          <script src="https://meet.jit.si/external_api.js" />

          <link
            href="https://fonts.googleapis.com/css2?family=Playfair&family=Rubik&display=swap"
            rel="stylesheet"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://app.wefoc.us" />
          <meta
            property="og:image"
            content="https://app.wefoc.us/common_thumbnail.jpg"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
