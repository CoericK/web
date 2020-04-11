import { Button } from "@blueprintjs/core";
import * as React from "react";
import css from "./IndexPage.module.css";
import useAuthentication from "../../hooks/useAuthentication";

interface Props extends React.Attributes {}

export default function IndexPage({}: Props) {
  const { user, isLoading, signIn, signOut } = useAuthentication();

  return (
    <div className={css.root}>
      <p>{isLoading ? "Hello" : user ? `Hello, ${user.name}` : "Hello"}</p>

      <p>
        {isLoading ? (
          <Button icon="log-in" loading>
            Sign in
          </Button>
        ) : user ? (
          <Button icon="log-in" onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <Button icon="log-out" onClick={signIn}>
            Sign in
          </Button>
        )}
      </p>
    </div>
  );
}
