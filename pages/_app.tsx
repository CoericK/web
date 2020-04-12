import { AppProps } from "next/app";
import * as React from "react";
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import useAuthentication from "../hooks/useAuthentication";
import { ServicesContext } from "../hooks/useServices";
import { createCreateParty } from "../services/createParty";
import { createGetMyAnonymousUser } from "../services/getMyAnonymousUser";
import { createGetPartyById } from "../services/getPartyById";
import { createOnPartyChange } from "../services/onPartyChange";
import "../global.css";

export default ({ Component, pageProps }: AppProps) => {
  const { token } = useAuthentication();

  const services = React.useMemo(
    () =>
      token
        ? {
            createParty: createCreateParty({ token }),
            getMyAnonymousUser: createGetMyAnonymousUser({ token }),
            getPartyById: createGetPartyById({ token }),
            onPartyChange: createOnPartyChange({ token }),
          }
        : {
            createParty: (() => {}) as any,
            getMyAnonymousUser: (() => {}) as any,
            getPartyById: (() => {}) as any,
            onPartyChange: (() => {}) as any,
          },
    [token]
  );

  return (
    <ServicesContext.Provider value={services}>
      <Component {...pageProps} />
    </ServicesContext.Provider>
  );
};
