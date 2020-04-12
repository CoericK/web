import { addMinutes } from "date-fns";
import Party from "../models/Party";
import AuthenticationToken from "../models/AuthenticationToken";

export function createCreateParty({ token }: { token?: AuthenticationToken }) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function createParty(): Promise<Party> {
    const response = await fetch(`${process.env.API_ORIGIN}/api/parties/`, {
      method: "POST",
      headers: { authorization: token! },
    });
    const json = await response.json();

    console.log(json);

    return {
      id: `qkwejlkwqe`,
      title: "Lorem Ipsum",
      jitsiRoomId: `ipsumqwleqeloremwefocus`,
      members: [],
      lastPomodoroSession: {
        id: 123,
        focusStartsAt: new Date(),
        focusEndsAt: addMinutes(new Date(), 24),
        breakStartsAt: addMinutes(new Date(), 24),
        breakEndsAt: addMinutes(new Date(), 29),
      },
    };
  }

  return createParty;
}
