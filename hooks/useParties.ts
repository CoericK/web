import Party from "../models/Party";
import { createCreateParty } from "../services/createParty";
import useAuthentication from "./useAuthentication";

export default function useParties(): {
  createParty: () => Promise<Party>;
} {
  const { token } = useAuthentication();

  // console.log(token);

  return {
    createParty: async () => {
      return await createCreateParty({ token })();
    },
  };
}
