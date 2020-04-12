export default async function issueAnonymousUser(): Promise<void> {
  await fetch(`${process.env.API_ORIGIN}/api/users/anonymous/`, {
    method: "POST",
  });
}
