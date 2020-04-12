export default function issueAnonymousUser(): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}
