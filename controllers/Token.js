import jwt from 'jsonwebtoken'
import tokenExpireSchema from '../modals/TokenModel.js'
import Methods from '../Config/Methods.js'
import { resMessages } from '../Config/Config.js'
var collectionName = 'tokenexpire'

const GenerateToken = async (req, res, next) => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Calculate token expiration date
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    // Extract user's IP address from the request
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Create a new TokenExpire document
    const tokenDetails = {
      token,
      tokenAge: '1h',
      tokenExpiration,
      ip: userIP,
    }

    const resp = await Methods.performCRUD('i', collectionName, tokenExpireSchema, tokenDetails)

     // Set the token in the response headers
     res.setHeader('Authorization', token)

     if(resp.status == 200){
       resp.message = resMessages['token']
       resp.data = token
     }

     req.responseData = resp
     next()
  } catch (e) {
    console.log(e)
    req.responseData = {status : 500, message : resMessages['error']}
    next()
  }
};

const VerifyToken = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    req.responseData = {
      status : 200,
      date : decoded
    }
    next()
  } catch (e) {
    console.log(e)
    req.responseData = {status : 500, message : resMessages['error']}
    next()
  }
}

export { GenerateToken, VerifyToken }

