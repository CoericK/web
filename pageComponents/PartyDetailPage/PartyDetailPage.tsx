import * as React from "react";
import PomodoroTimer from "./PomodoroTimer";
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
        jitsiRoomName="dlk;d;wlekqwe"
        onParticipantsChange={(participants) => {
          setShareDialogOpen(participants === 1);
        }}
        className={css.video}
      />

      <PomodoroTimer
        className={css.pomodoro}
        session={{
          type: "BREAK",
          startsAt: new Date(2020, 3, 11, 18, 20, 0),
          endsAt: new Date(2020, 3, 11, 18, 45, 0),
        }}
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
