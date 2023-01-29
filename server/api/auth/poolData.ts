const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID ? process.env.AWS_USER_POOL_ID : 'not defined',
  ClientId: process.env.AWS_CLIENT_ID ? process.env.AWS_CLIENT_ID : 'not defined',
}

export default poolData;
