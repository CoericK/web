import * as React from "react";
import { Subscription } from "rxjs";
import Party, { PartyId } from "../models/Party";
import useAuthentication from "./useAuthentication";
import { createCreatePomodoroSession } from "../services/createPomodoroSession";
import { createGetPartyById } from "../services/getPartyById";
import { createOnPartyChange } from "../services/onPartyChange";

export default function useParty(partyId: PartyId) {
  const { token, isLoading: isAuthenticationLoading } = useAuthentication();
  const [party, setParty] = React.useState<Party | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticationLoading) return () => {};

    setLoading(true);

    let subscription: Subscription;

    // console.log(token);
    // console.log(partyId);

    createGetPartyById({ token })(partyId).then((party) => {
      setParty(party);
      setLoading(false);

      subscription = createOnPartyChange({ token })(partyId).subscribe(
        (party) => {
          setParty(party);
        }
      );
    });

    return () => subscription?.unsubscribe();
  }, [partyId, isAuthenticationLoading]);

  const startPomodoroSession = () => {
    createCreatePomodoroSession({ token: token! })(partyId, {}).then(
      (session) => {
        setParty({ ...(party as any), lastPomodoroSession: session });
      }
    );
  };

  const restartPomodoroSession = () => {
    createCreatePomodoroSession({ token: token! })(partyId, {
      restart: true,
    }).then((session) => {
      setParty({ ...(party as any), lastPomodoroSession: session });
    });
  };

  return {
    party,
    isLoading: isLoading || isAuthenticationLoading,
    startPomodoroSession,
    restartPomodoroSession,
  };
}
