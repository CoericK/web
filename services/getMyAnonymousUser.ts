import AnonymousUser from "../models/AnonymousUser";

export default function getMyAnonymousUser(): Promise<AnonymousUser> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: "John Due" }), 2000)
  );
}
