import Party from "../models/Party";
import AuthenticationToken from "../models/AuthenticationToken";

export function createGetPartyById({
  token,
}: {
  token: AuthenticationToken | null;
}) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function getPartyById(id: string): Promise<Party> {
    const response = await fetch(
      `${process.env.API_ORIGIN}/api/parties/${id}/`,
      { headers: { Authorization: `Token ${token}` } }
    );
    const json = await response.json();

    console.log(json);

    return {
      id,
      title: "Pomodoro Session",
      jitsiRoomId: json.party.jitsi_id,
      members: [],
      lastPomodoroSession: json.timer.focus_starts_at
        ? {
            id: id as any,
            focusStartsAt: new Date(json.timer.focus_starts_at),
            focusEndsAt: new Date(json.timer.focus_ends_at),
            breakStartsAt: new Date(json.timer.break_starts_at),
            breakEndsAt: new Date(json.timer.break_ends_at),
          }
        : null,
    };
  }

  return getPartyById;
}
