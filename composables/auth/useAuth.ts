// https://github.com/damien-hl/nuxt3-auth-example

import { useAuthUser } from "./useAuthUser"

export const useAuth = () => {
  const authUser = useAuthUser()

  const setUser = (user: any) => {
    authUser.value = user
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
      console.log("Error in fetch register:", error)
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
      console.log("Error in fetch login:", error)
    }
  }

  return {
    register,
    login
  }
}
