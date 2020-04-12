import * as React from "react";
import AuthenticationToken from "../models/AuthenticationToken";
// import { createGetMyAnonymousUser } from "../services/getMyAnonymousUser";
import issueAnonymousUserToken from "../services/issueAnonymousUserToken";

export default function useAuthentication() {
  const [token, setToken] = React.useState<AuthenticationToken | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let token = loadAuthenticationToken();

      if (!token) {
        token = await issueAnonymousUserToken();

        saveAuthenticationToken(token);
      }

      // const user = await createGetMyAnonymousUser({ token: token! })();

      setToken(token);
      setLoading(false);
    })();
  }, []);

  return {
    token,
    isLoading,
  };
}

function loadAuthenticationToken(): AuthenticationToken | null {
  return globalThis.localStorage.getItem("wefocus_authentication_token") as any;
}

function saveAuthenticationToken(token: AuthenticationToken): void {
  globalThis.localStorage.setItem("wefocus_authentication_token", token);
}
