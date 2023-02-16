export const useAuthError = () => {
  return useState<any | null>('authError', () => null)
}
