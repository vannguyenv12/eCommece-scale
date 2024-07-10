import JWT from 'jsonwebtoken';

export const createTokenPair = async (payload: any, publicKey: any, privateKey: any) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    });

    JWT.verify(accessToken, publicKey, (err: any, decode: any) => {
      if (err) {
        console.error(`Err verify: ${err}`);
      }
      else {
        console.log(`decode verify:`, decode)
      }
    })

    return { accessToken, refreshToken }

  } catch (error) {

  }
}
