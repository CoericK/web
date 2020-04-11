import { AppProps } from "next/app";
import * as React from "react";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "../global.css";

export default ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);
