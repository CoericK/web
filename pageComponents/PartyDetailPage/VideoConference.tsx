import * as React from "react";
import css from "./VideoConference.module.css";

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
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const jitsi = new (globalThis as any).JitsiMeetExternalAPI("meet.jit.si", {
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
        CONNECTION_INDICATOR_DISABLED: true,
        VIDEO_QUALITY_LABEL_DISABLED: true,
        DISABLE_PRESENCE_STATUS: false,
      },
    });

    jitsi.executeCommand("displayName", "New Nickname");
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
  }, []);

  return <div className={css.root} ref={containerRef} {...props}></div>;
}
