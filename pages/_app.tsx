import { AppProps } from "next/app";
import * as React from "react";
import "../global.css";

export default ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);
