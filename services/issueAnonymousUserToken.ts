import AuthenticationToken from "../models/AuthenticationToken";

export default async function issueAnonymousUserToken(): Promise<
  AuthenticationToken
> {
  // await fetch(`${process.env.API_ORIGIN}/api/users/anonymous/`, {
  //   method: "POST",
  // });

  return Promise.resolve("f80759f754d065cb0fe19828fc0312c500433ac5" as any);
}
