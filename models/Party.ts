import PomodoroSession from "./PomodoroSession";

export default interface Party {
  id: PartyId;
  title: string;
  jitsiRoomId: string;
  members: unknown[];
  lastPomodoroSession: PomodoroSession | null;
}

export type PartyId = string;
