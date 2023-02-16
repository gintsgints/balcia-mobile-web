export interface RegisterRequest {
  email: string
  password: string
  rc: string
  hash: string
  code: string
}

export const useRegisterRequest = () => {
  return useState<RegisterRequest | null>('person', () => null)
}
