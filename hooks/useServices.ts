import * as React from "react";
import getMyAnonymousUser from "../services/getMyAnonymousUser";
import getPartyById from "../services/getPartyById";
import issueAnonymousUser from "../services/issueAnonymousUser";

interface Services {
  getMyAnonymousUser: typeof getMyAnonymousUser;
  getPartyById: typeof getPartyById;
  issueAnonymousUser: typeof issueAnonymousUser;
}

export default function useServices() {
  return React.useContext(ServicesContext);
}

export const ServicesContext = React.createContext<Services>(null as any);
