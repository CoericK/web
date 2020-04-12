import * as React from "react";
import PomodoroTimer from "./PomodoroTimer";
import ShareDialog from "./ShareDialong";
import VideoConference from "./VideoConference";
import css from "./PartyDetailPage.module.css";
import useParty from "../../hooks/useParty";

interface Props extends React.Attributes {
  partyId: string;
}

export default function PartyDetailPage({ partyId }: Props) {
  const [isShareDialogOpen, setShareDialogOpen] = React.useState(false);
  const { party, isLoading } = useParty(partyId);

  return (
    <div className={css.root}>
      {party ? (
        <VideoConference
          jitsiRoomName={party.jitsiRoomId}
          onParticipantsChange={(participants) => {
            setShareDialogOpen(participants === 1);
          }}
          className={css.video}
        />
      ) : null}

      <PomodoroTimer
        className={css.pomodoro}
        session={party?.lastPomodoroSession}
        loading={isLoading}
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
