import * as React from "react";
import Party, { PartyId } from "../models/Party";
import useAuthentication from "./useAuthentication";
import useServices from "./useServices";

export default function useParty(partyId: PartyId) {
  const { getPartyById } = useServices();
  const { user, isLoading: isAuthenticationLoading } = useAuthentication();
  const [party, setParty] = React.useState<Party | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;

    setLoading(true);

    getPartyById(partyId).then((party) => {
      setParty(party);
    });

    setLoading(false);
  }, [user]);

  return { party, isLoading: isLoading || isAuthenticationLoading };
}
