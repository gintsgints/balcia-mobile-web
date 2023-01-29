export interface PayloadBase {
  sub: string
  iss: string
  origin_jti: string
  event_id: string
  token_use: string
  auth_time: number
  exp: number
  iat: number
  jti: string
}

export interface IdPayload extends PayloadBase {
  email_verivied: string | null
  "custom:registry_code": string | null
  "cognito:username": string | null
  aud: string | null
  "custom:hash_type": string | null
  "custom:base64_hash": string | null
  email: string | null
}

export interface AccessPayload extends PayloadBase {
  client_id: string | null
  username: string | null
}

export interface IdToken {
  jwtToken: string
  payload: IdPayload
}

export interface RefreshToken {
  token: string
}

export interface AccessToken {
  jwtToken: string
  payload: AccessPayload
}

export interface User {
  idToken: IdToken
  refreshToken: RefreshToken
  accessToken: AccessToken

  email: string
  password: string
}

export type UserWithoutPassword = Omit<User, 'password'>
