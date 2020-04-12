import { addMinutes } from "date-fns";
import { Observable } from "rxjs";
import Party from "../models/Party";

export default function onPartyChange(id: string): Observable<Party> {
  return new Observable((subscriber) => {
    const intervalId = setInterval(() => {
      new Promise<Party>((resolve) =>
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
      ).then((party) => {
        subscriber.next(party);
      });
    }, 5000);

    return () => clearInterval(intervalId);
  });
}
