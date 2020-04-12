import useServices from "./useServices";
import Party from "../models/Party";
import useAuthentication from "./useAuthentication";

export default function useParties(): {
  createParty: () => Promise<Party>;
} {
  const { createParty } = useServices();
  const { user } = useAuthentication();

  return {
    createParty: async () => {
      if (!user) return Promise.reject();

      return await createParty();
    },
  };
}
