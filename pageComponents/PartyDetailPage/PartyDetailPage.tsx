import * as React from "react";
import VideoConference from "./VideoConference";
import css from "./PartyDetailPage.module.css";

interface Props extends React.Attributes {
  partyId: string;
}

export default function PartyDetailPage({}: Props) {
  return <VideoConference jitsiRoomName="qweqwee" className={css.video} />;
}
