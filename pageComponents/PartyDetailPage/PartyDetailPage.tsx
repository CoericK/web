import * as React from "react";
import styled from "styled-components";
import useParty from "../../hooks/useParty";
import PomodoroTimer from "./PomodoroTimer";
import ShareDialog from "./ShareDialong";
import VideoConference from "./VideoConference";

interface Props extends React.Attributes {
  partyId: string;
}

export default function PartyDetailPage({ partyId }: Props) {
  const [isShareDialogOpen, setShareDialogOpen] = React.useState(false);
  const {
    party,
    isLoading,
    startPomodoroSession,
    restartPomodoroSession,
  } = useParty(partyId);

  return (
    <Root>
      {party ? (
        <Video
          jitsiRoomName={party.jitsiRoomId}
          onParticipantsChange={(participants) => {
            setShareDialogOpen(participants === 1);
          }}
        />
      ) : null}

      <Timer
        session={party?.lastPomodoroSession ?? undefined}
        loading={isLoading}
        onStartButtonClick={startPomodoroSession}
        onRestartButtonClick={restartPomodoroSession}
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
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    256deg,
    rgba(201, 30, 73, 1) 0%,
    rgba(247, 109, 71, 1) 100%
  );
`;

const Video = styled(VideoConference)`
  width: 100%;
  height: 100%;
`;

const Timer = styled(PomodoroTimer)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;
