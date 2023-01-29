import { CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js"
import poolData from "./poolData"

export default defineEventHandler(async (event) => {
  const body = await readBody<{email: string, password: string, rc: string, hash: string}>(event)

  const userPool = new CognitoUserPool(poolData)
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: body.email
    }),
    new CognitoUserAttribute({
      Name: 'custom:registry_code',
      Value: body.rc
    }),
    new CognitoUserAttribute({
      Name: 'custom:base64_hash',
      Value: body.hash
    }),
    new CognitoUserAttribute({
      Name: 'custom:hash_type',
      Value: 'SHA512'
    })
  ]

  const register = () => {
    return new Promise((resolve, reject) => {
      userPool.signUp(body.email, body.password, attributeList, [], (err: any, result: any) => {
        console.log("Error", err)
        console.log("Result", result)
        if (err) {
          reject()
          return;
        }
        resolve(result.user)
      })
    })
  }

  return await register()
})
