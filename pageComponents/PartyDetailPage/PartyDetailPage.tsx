import * as React from "react";
import ShareDialog from "./ShareDialong";
import VideoConference from "./VideoConference";
import css from "./PartyDetailPage.module.css";

interface Props extends React.Attributes {
  partyId: string;
}

export default function PartyDetailPage({}: Props) {
  const [isShareDialogOpen, setShareDialogOpen] = React.useState(false);

  return (
    <div className={css.root}>
      <VideoConference
        jitsiRoomName="qweqwee"
        onParticipantsChange={(participants) => {
          setShareDialogOpen(participants === 1);
        }}
        className={css.video}
      />

      <ShareDialog
        shareURL={
          new URL(
            globalThis.location
              ? globalThis.location.href
              : "https://app.foc.us/"
          )
        }
        open={isShareDialogOpen}
      />
    </div>
  );
}
