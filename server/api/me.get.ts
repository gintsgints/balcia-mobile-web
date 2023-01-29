export default defineEventHandler(async (event) => {
  const currentUser = useAuthUser()
  const binsy_url = process.env.AWS_USER_POOL_ID ? process.env.AWS_USER_POOL_ID : 'not defined'

  const data = await $fetch(binsy_url + '/rest/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + currentUser.IdToken
    }
  })
  console.log("API return data:", data)
})
