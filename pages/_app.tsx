import { AppProps } from "next/app";
import * as React from "react";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ServicesContext } from "../hooks/useServices";
import getMyAnonymousUser from "../services/getMyAnonymousUser";
import getPartyById from "../services/getPartyById";
import issueAnonymousUser from "../services/issueAnonymousUser";
import "../global.css";

export default ({ Component, pageProps }: AppProps) => {
  const services = React.useMemo(
    () => ({
      getMyAnonymousUser,
      getPartyById,
      issueAnonymousUser,
    }),
    []
  );

  return (
    <ServicesContext.Provider value={services}>
      <Component {...pageProps} />
    </ServicesContext.Provider>
  );
};
