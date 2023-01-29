import type { UserWithoutPassword } from "./user";

export const useAuthUser = () => {
  return useState<UserWithoutPassword | null>('user', () => null)
}
