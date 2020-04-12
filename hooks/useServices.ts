import * as React from "react";
import createParty from "../services/createParty";
import getMyAnonymousUser from "../services/getMyAnonymousUser";
import getPartyById from "../services/getPartyById";
import issueAnonymousUser from "../services/issueAnonymousUser";
import onPartyChange from "../services/onPartyChange";

interface Services {
  createParty: typeof createParty;
  getMyAnonymousUser: typeof getMyAnonymousUser;
  getPartyById: typeof getPartyById;
  issueAnonymousUser: typeof issueAnonymousUser;
  onPartyChange: typeof onPartyChange;
}

export default function useServices() {
  return React.useContext(ServicesContext);
}

export const ServicesContext = React.createContext<Services>(null as any);
