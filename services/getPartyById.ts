import { addMinutes } from "date-fns";
import Party from "../models/Party";

export default function getPartyById(id: string) {
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
