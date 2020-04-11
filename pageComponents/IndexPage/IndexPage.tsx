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
          <button disabled>Loading...</button>
        ) : user ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signIn}>Sign in</button>
        )}
      </p>
    </div>
  );
}
