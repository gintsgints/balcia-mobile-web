// https://github.com/damien-hl/nuxt3-auth-example

import { useAuthUser } from "./useAuthUser"
import { useAuthError } from "./useAuthError"

export const useAuth = () => {
  const authUser = useAuthUser()
  const authError = useAuthError()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setAuthError = (error: any) => {
    authError.value = error
  }

  const register = async (email: string, password: string, rc: string, hash: string) => {
    try {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email,
          password,
          rc,
          hash
        }
      })
    } catch (error) {
      setAuthError(error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await $fetch("/api/auth/login", {
        method: "post",
        body: {
          email,
          password
        }
      })
      setUser(result)
      
    } catch (error) {
      setAuthError(error)
    }
  }

  return {
    register,
    login
  }
}
