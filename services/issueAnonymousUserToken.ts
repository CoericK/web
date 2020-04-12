import AuthenticationToken from "../models/AuthenticationToken";

export default async function issueAnonymousUserToken(): Promise<
  AuthenticationToken
> {
  const response = await fetch(
    `${process.env.API_ORIGIN}/api/users/anonymous/`,
    {
      method: "POST",
    }
  );
  const json = await response.json();

  return json.key;
}
