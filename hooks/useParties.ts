import useServices from "./useServices";
import Party from "../models/Party";

export default function useParties(): {
  createParty: () => Promise<Party>;
} {
  const { createParty } = useServices();

  return {
    createParty: async () => {
      return await createParty();
    },
  };
}
