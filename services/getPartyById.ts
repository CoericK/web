import { addMinutes } from "date-fns";
import Party from "../models/Party";
import AuthenticationToken from "../models/AuthenticationToken";

export function createGetPartyById({ token }: { token?: AuthenticationToken }) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function getPartyById(id: string): Promise<Party> {
    const response = await fetch(
      `${process.env.API_ORIGIN}/api/parties/${id}/`,
      { headers: { Authorization: token! } }
    );
    const json = await response.json();

    console.log(json);

    return new Promise<Party>((resolve) =>
      setTimeout(
        () =>
          resolve({
            id,
            title: "Lorem Ipsum",
            jitsiRoomId: `ipsum${id}loremwefocus`,
            members: [],
            lastPomodoroSession: {
              id: 123,
              focusStartsAt: new Date(),
              focusEndsAt: addMinutes(new Date(), 24),
              breakStartsAt: addMinutes(new Date(), 24),
              breakEndsAt: addMinutes(new Date(), 29),
            },
          }),
        2000
      )
    );
  }

  return getPartyById;
}
