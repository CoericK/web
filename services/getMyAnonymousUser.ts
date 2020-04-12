import AnonymousUser from "../models/AnonymousUser";

export default async function getMyAnonymousUser(): Promise<AnonymousUser> {
  const response = await fetch(`${process.env.API_ORIGIN}/rest-auth/user`);
  const json = await response.json();

  return { name: `${json.first_name} ${json.last_name}` };
}
