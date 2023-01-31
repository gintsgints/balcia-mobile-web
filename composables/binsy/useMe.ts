import { usePerson } from "./usePerson"
import { useAuthUser } from "../auth/useAuthUser"

export const useMe = () => {
  const authUser = useAuthUser()
  const person = usePerson()

  const setPerson = (personData: any) => {
    person.value = personData
  }

  const me = async () => {
    try {
      const data = await $fetch('/binsy/me', {
        headers: {
          'Authorization': 'Bearer ' + authUser.value?.accessToken.jwtToken
        }
      })
    } catch (error) {
      console.log("Error in fetch binsy/me:", error)
    }
  }

  return {
    me
  }

}