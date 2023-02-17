import { useAuthUser } from "~~/composables/auth"

export default defineEventHandler(async (event) => {
  const binsy_url = process.env.BINSY_URL ? process.env.BINSY_URL : 'not defined'
  const currentUser = useAuthUser()

  try {
    const data = await $fetch(binsy_url + '/rest/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + currentUser.value?.idToken
      }
    })
    return data
  } catch (error) {
    return error     
  }
})
