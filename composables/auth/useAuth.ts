// https://github.com/damien-hl/nuxt3-auth-example

import { useAuthUser } from "./useAuthUser"
import { useAuthError } from "./useAuthError"
import { useRegisterRequest } from "./useRegisterRequest"

export const useAuth = () => {
  const authUser = useAuthUser()
  const authError = useAuthError()
  const registerRequest = useRegisterRequest()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setAuthError = (error: any) => {
    authError.value = error
  }

  const setRegisterRequest = (request: any) => {
    registerRequest.value = request
  }

  const register = async () => {
    if (registerRequest.value != null) {
      setAuthError(null)
      try {
        await useFetch('/api/auth/register', {
          method: 'POST',
          body: {
            email: registerRequest.value?.email,
            password: registerRequest.value?.password,
            rc: registerRequest.value?.rc,
            hash: registerRequest.value?.hash
          }
        })
      } catch (error) {
        setAuthError(error)
      }
      setRegisterRequest(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await useFetch("/api/auth/login", {
        method: "post",
        body: {
          email,
          password
        }
      })
      setUser(result.data)
      
    } catch (error) {
      setAuthError(error)
    }
  }

  return {
    setRegisterRequest,
    register,
    login
  }
}
