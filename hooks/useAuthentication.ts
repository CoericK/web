import User from "../models/User";
import * as React from "react";

export default function useAuthentication(): {
  user: User | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
} {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const mockauth = globalThis.localStorage.getItem("mockauth");

    if (mockauth) {
      mockFetchUser().then((user) => {
        globalThis.localStorage.setItem("mockauth", JSON.stringify(user));

        setUser(user);
        setLoading(false);
      });

      return;
    }

    setLoading(false);
  }, []);

  const signIn = async () => {
    setLoading(true);

    const user = await mockFetchUser();

    globalThis.localStorage.setItem("mockauth", JSON.stringify(user));

    setUser(user);
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);

    globalThis.localStorage.removeItem("mockauth");

    setUser(null);
    setLoading(false);
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
}

function mockFetchUser(): Promise<User> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: "John Due" }), 2000)
  );
}
