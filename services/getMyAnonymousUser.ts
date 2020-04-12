import AnonymousUser from "../models/AnonymousUser";
import AuthenticationToken from "../models/AuthenticationToken";

export function createGetMyAnonymousUser({
  token,
}: {
  token?: AuthenticationToken;
}) {
  if (!token) {
    return () => Promise.reject(new Error("No authentication token provided."));
  }

  async function getMyAnonymousUser(): Promise<AnonymousUser | null> {
    const response = await fetch(`${process.env.API_ORIGIN}/rest-auth/user/`, {
      headers: { authorization: token! },
    });

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    const json = await response.json();

    return { name: `${json.first_name} ${json.last_name}` };
  }

  return getMyAnonymousUser;
}
