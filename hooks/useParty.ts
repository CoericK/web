import * as React from "react";
import { Subscription } from "rxjs";
import Party, { PartyId } from "../models/Party";
import useAuthentication from "./useAuthentication";
import useServices from "./useServices";

export default function useParty(partyId: PartyId) {
  const { getPartyById, onPartyChange } = useServices();
  const { token, isLoading: isAuthenticationLoading } = useAuthentication();
  const [party, setParty] = React.useState<Party | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticationLoading) return () => {};

    setLoading(true);

    let subscription: Subscription;

    console.log(token);
    console.log(partyId);

    getPartyById(partyId).then((party) => {
      setParty(party);
      setLoading(false);

      subscription = onPartyChange(partyId).subscribe((party) => {
        setParty(party);
      });
    });

    return () => subscription?.unsubscribe();
  }, [partyId, isAuthenticationLoading]);

  return { party, isLoading: isLoading || isAuthenticationLoading };
}
