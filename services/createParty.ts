import { addMinutes } from "date-fns";
import Party from "../models/Party";

export default function createParty(): Promise<Party> {
  return new Promise<Party>((resolve) =>
    setTimeout(
      () =>
        resolve({
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
        }),
      2000
    )
  );
}
