import { PartyId } from "../models/Party";
import AuthenticationToken from "../models/AuthenticationToken";
import PomodoroSession from "../models/PomodoroSession";

export function createCreatePomodoroSession({
  token,
}: {
  token?: AuthenticationToken;
}) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function createPomodoroSession(
    partyId: PartyId,
    { restart = false }: { restart?: boolean }
  ): Promise<PomodoroSession> {
    const response = await fetch(
      restart
        ? `${process.env.API_ORIGIN}/api/parties/restart_pomodoro_timer/`
        : `${process.env.API_ORIGIN}/api/parties/start_pomodoro_timer/`,
      {
        method: "POST",
        headers: {
          authorization: `Token ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          slug: partyId,
          focus_duration: 25,
          break_duration: 5,
        }),
      }
    );
    const json = await response.json();

    console.log(json);

    return {
      id: partyId as any,
      focusStartsAt: new Date(json.focus_starts_at),
      focusEndsAt: new Date(json.focus_ends_at),
      breakStartsAt: new Date(json.break_starts_at),
      breakEndsAt: new Date(json.break_ends_at),
    };
  }

  return createPomodoroSession;
}
