import PomodoroSession from "./PomodoroSession";

export default interface Party {
  id: PartyId;
  title: string;
  jitsiRoomId: string;
  members: unknown[];
  lastPomodoroSession: PomodoroSession;
}

export type PartyId = string;
