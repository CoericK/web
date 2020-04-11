import { useRouter } from "next/router";
import Head from "next/head";
import PartyDetailPage from "../../pageComponents/PartyDetailPage";

export default () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PartyDetailPage partyId={router.query.partyId as any} />
    </>
  );
};
