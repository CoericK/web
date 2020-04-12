export default interface PomodoroSession {
  id: PomodoroSessionId;
  focusStartsAt: Date;
  focusEndsAt: Date;
  breakStartsAt: Date;
  breakEndsAt: Date;
}

export type PomodoroSessionId = number;
