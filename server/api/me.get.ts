import { useAuthUser } from "~~/composables/auth"

export default defineEventHandler(async (event) => {
  const binsy_url = process.env.AWS_USER_POOL_ID ? process.env.AWS_USER_POOL_ID : 'not defined'
  const currentUser = useAuthUser()

  // try {
  //   const data = await $fetch(binsy_url + '/rest/me', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + currentUser.value?.idToken
  //     }
  //   })
  //   return data
  // } catch (error) {
  //   return error     
  // }
  return currentUser
})
