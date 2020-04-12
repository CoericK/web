import Party from "../models/Party";
import AuthenticationToken from "../models/AuthenticationToken";

export function createCreateParty({
  token,
}: {
  token: AuthenticationToken | null;
}) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function createParty(): Promise<Party> {
    const response = await fetch(`${process.env.API_ORIGIN}/api/parties/`, {
      method: "POST",
      headers: { authorization: `Token ${token}` },
    });
    const json = await response.json();

    console.log(json);

    return {
      id: json.party.slug,
      title: "Session",
      jitsiRoomId: json.party.jitsi_id,
      members: [],
      lastPomodoroSession: null,
    };
  }

  return createParty;
}
