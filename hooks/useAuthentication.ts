import constate from "constate";
import * as React from "react";
import AuthenticationToken from "../models/AuthenticationToken";
import { createGetMyAnonymousUser } from "../services/getMyAnonymousUser";
import issueAnonymousUserToken from "../services/issueAnonymousUserToken";

const [Provider, useAuthentication] = constate(() => {
  const [token, setToken] = React.useState<AuthenticationToken | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let token = loadAuthenticationToken();

      if (!token) {
        token = await issueAnonymousUserToken();

        saveAuthenticationToken(token);
      } else {
        const user = await createGetMyAnonymousUser({ token: token! })();

        if (!user) {
          token = await issueAnonymousUserToken();

          saveAuthenticationToken(token);
        }
      }

      setToken(token);
      setLoading(false);
    })();
  }, []);

  return {
    token,
    isLoading,
  };
});

export const AuthenticationProvider = Provider;

export default useAuthentication;

function loadAuthenticationToken(): AuthenticationToken | null {
  return globalThis.localStorage.getItem("wefocus_authentication_token") as any;
}

function saveAuthenticationToken(token: AuthenticationToken): void {
  globalThis.localStorage.setItem("wefocus_authentication_token", token);
}
