import { AnchorButton } from "@blueprintjs/core";
import Link from "next/link";
import * as React from "react";
import css from "./IndexPage.module.css";

interface Props extends React.Attributes {}

export default function IndexPage({}: Props) {
  return (
    <main className={css.root}>
      <h1 className={css.logo}>WeFocus</h1>

      <Link href="/parties/[partyId]" as="/parties/abc" passHref>
        <AnchorButton icon="plus" large className={css["create-room"]}>
          Create Party
        </AnchorButton>
      </Link>

      <div className={css.help}>
        <h2>You wanna join to a party?</h2>

        <p>Ask friends an invitation URL and just access to it!</p>
      </div>
    </main>
  );
}
