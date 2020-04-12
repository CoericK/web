import AnonymousUser from "../models/AnonymousUser";
import * as React from "react";
import useServices from "./useServices";

export default function useAuthentication(): {
  user: AnonymousUser | null;
  isLoading: boolean;
} {
  const { getMyAnonymousUser, issueAnonymousUser } = useServices();
  const [user, setUser] = React.useState<AnonymousUser | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let user = await getMyAnonymousUser();

      if (!user) {
        await issueAnonymousUser();

        user = await getMyAnonymousUser();
      }

      setUser(user);
      setLoading(false);
    })();
  }, []);

  return {
    user,
    isLoading,
  };
}
