import * as React from "react";
import { Subscription } from "rxjs";
import Party, { PartyId } from "../models/Party";
import useAuthentication from "./useAuthentication";
import useServices from "./useServices";

export default function useParty(partyId: PartyId) {
  const { getPartyById, onPartyChange } = useServices();
  const { user, isLoading: isAuthenticationLoading } = useAuthentication();
  const [party, setParty] = React.useState<Party | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return () => {};

    setLoading(true);

    let subscription: Subscription;

    getPartyById(partyId).then((party) => {
      setParty(party);

      subscription = onPartyChange(partyId).subscribe((party) => {
        setParty(party);
      });
    });

    setLoading(false);

    return () => subscription?.unsubscribe();
  }, [user]);

  return { party, isLoading: isLoading || isAuthenticationLoading };
}
