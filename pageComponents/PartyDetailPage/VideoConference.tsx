import * as React from "react";
import styled from "styled-components";
import useUser from "../../hooks/useUser";

interface Props extends React.Attributes {
  jitsiRoomName: string;
  onParticipantsChange?: (participants: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function VideoConference({
  jitsiRoomName,
  onParticipantsChange = () => {},
  ...props
}: Props) {
  const { user } = useUser();
  const [jitsi, setJitsi] = React.useState<any>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const listener = () => {
      console.log("bye bye");
    };

    globalThis.addEventListener("unload", listener);

    return () => globalThis.removeEventListener("unload", listener);
  }, []);

  React.useEffect(() => {
    const jitsi = new (globalThis as any).JitsiMeetExternalAPI(
      process.env.JITSI_HOST,
      {
        roomName: jitsiRoomName,
        parentNode: containerRef.current,
        configOverwrite: {
          enableCalendarIntegration: false,
        },
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND:
            "linear-gradient(256deg, rgba(201,30,73,1) 0%, rgba(247,109,71,1) 100%)",
          DISABLE_VIDEO_BACKGROUND: false,
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "desktop",
            "videoquality",
            "settings",
          ],
          SETTINGS_SECTIONS: ["devices"],
          DISABLE_FOCUS_INDICATOR: true,
          DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
          CONNECTION_INDICATOR_DISABLED: true,
          VIDEO_QUALITY_LABEL_DISABLED: true,
          DISABLE_PRESENCE_STATUS: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      }
    );

    jitsi.executeCommand("displayName", user?.name ?? "No Name");
    jitsi.executeCommand("subject", " ");

    jitsi.addEventListener("videoConferenceJoined", () => {
      onParticipantsChange(jitsi.getNumberOfParticipants());
    });

    jitsi.addEventListener("participantJoined", () => {
      onParticipantsChange(jitsi.getNumberOfParticipants());
    });

    jitsi.addEventListener("participantLeft", () => {
      onParticipantsChange(jitsi.getNumberOfParticipants());
    });

    setJitsi(jitsi);
  }, []);

  React.useEffect(() => {
    if (!jitsi) return;

    jitsi.executeCommand("displayName", user?.name ?? "No Name");
  }, [jitsi, user]);

  return <Root ref={containerRef} {...props}></Root>;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
`;
