import { useRouter } from "next/router";
import Head from "next/head";
import PartyDetailPage from "../../pageComponents/PartyDetailPage";

export default () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>WeFocus</title>
        <meta property="og:title" content="WeFocus" />
      </Head>

      <PartyDetailPage partyId={router.query.partyId as any} />
    </>
  );
};
