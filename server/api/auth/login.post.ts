import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js"
import poolData from "./poolData"

export default defineEventHandler(async (event) => {
  const body = await readBody<{email: string, password: string}>(event)

  const authenticationData = {
    Username: body.email,
    Password: body.password
  }

  let authenticationDetails = new AuthenticationDetails(authenticationData)

  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: body.email,
    Pool: userPool
  }

  const cognitoUser = new CognitoUser(userData)

  const authenticate = () => {
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject
      })
    })
  }

  const tokens = await authenticate()

  return tokens
})