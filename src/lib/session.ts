// TODO: This will be replaced by Better Auth in the next step.
export const MOCK_LOGGED_IN = false;

export type User = { name: string; email: string; image?: string | null } | null;

export function getCurrentUser(): User {
  if (MOCK_LOGGED_IN) {
    return { name: "Rezwan Ahmed", email: "rezwanahmed@gmail.com" };
  }
  return null;
}
