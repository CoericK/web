import * as React from "react";
import AnonymousUser from "../models/AnonymousUser";
import useAuthentication from "./useAuthentication";
import useServices from "./useServices";

export default function useUser() {
  const { isLoading: isAuthLoading } = useAuthentication();
  const { getMyAnonymousUser } = useServices();
  const [user, setUser] = React.useState<AnonymousUser | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthLoading) return () => {};

    setLoading(true);

    getMyAnonymousUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {};
  }, [isAuthLoading]);

  return {
    user,
    isLoading: isAuthLoading || isLoading,
  };
}
