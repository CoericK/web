import Document, { Html, Head, Main, NextScript } from "next/document";
import * as React from "react";

export default class extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://meet.jit.si/external_api.js" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
