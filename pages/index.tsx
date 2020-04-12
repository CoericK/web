import Head from "next/head";
import IndexPage from "../pageComponents/IndexPage";

export default () => (
  <>
    <Head>
      <title>WeFocus</title>
      <meta property="og:title" content="WeFocus" />
    </Head>

    <IndexPage />
  </>
);
