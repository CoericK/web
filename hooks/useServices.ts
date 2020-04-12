import * as React from "react";
import { createCreateParty } from "../services/createParty";
import { createGetMyAnonymousUser } from "../services/getMyAnonymousUser";
import { createGetPartyById } from "../services/getPartyById";
import { createOnPartyChange } from "../services/onPartyChange";

interface Services {
  createParty: ReturnType<typeof createCreateParty>;
  getMyAnonymousUser: ReturnType<typeof createGetMyAnonymousUser>;
  getPartyById: ReturnType<typeof createGetPartyById>;
  onPartyChange: ReturnType<typeof createOnPartyChange>;
}

export default function useServices() {
  return React.useContext(ServicesContext);
}

export const ServicesContext = React.createContext<Services>(null as any);
