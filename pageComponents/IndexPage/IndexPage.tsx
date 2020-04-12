import { AnchorButton } from "@blueprintjs/core";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {}

export default function IndexPage({}: Props) {
  return (
    <Root>
      <Logo>WeFocus</Logo>

      <Link href="/parties/[partyId]" as="/parties/abc" passHref>
        <CrateRoomButton icon="plus" large>
          Create Party
        </CrateRoomButton>
      </Link>

      <Help>
        <h2>You wanna join to a party?</h2>

        <p>Ask friends an invitation URL and just access to it!</p>
      </Help>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-areas: "logo" "." "create-room" "." "help";
  grid-template-rows: auto 32px auto 64px auto;
  justify-content: center;
  align-content: center;
  justify-items: center;
  min-height: 100vh;
  background: linear-gradient(
    256deg,
    rgba(201, 30, 73, 1) 0%,
    rgba(247, 109, 71, 1) 100%
  );
`;

const Logo = styled.h1`
  grid-area: logo;
  color: white;
  font-family: Playfair;
  font-weight: 900;
  font-size: 64px;
  text-align: center;
`;

const CrateRoomButton = styled(AnchorButton)`
  grid-area: create-room;
`;

const Help = styled.div`
  grid-area: help;
  color: white;
  font-family: Rubik;

  > p {
    margin: 1em 0;
  }
`;
