const jwt = require('jsonwebtoken');
const tokenExpireSchema = require('../modals/TokenModel');
const Methods = require('../Config/Methods');
const { resMessages } = require('../Config/Config');

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

    const resp = await Methods.performCRUD('i','TokenExpire', tokenExpireSchema, tokenDetails)

     // Set the token in the response headers
     res.setHeader('Authorization', token)

     if(resp.status == 200){
       resp.message = resMessages['token']
       resp.data = token
     }

     res.data = resp
     next()
  } catch (e) {
    console.log(e)
    res.data({status : 500, message : resMessages['error']})
    next()
  }
};

const VerifyToken = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    res.data = {
      status : 200,
      date : decoded
    }
    next()
  } catch (e) {
    console.log(e)
    res.data({status : 500, message : resMessages['error']})
    next()
  }
}

module.exports = { GenerateToken, VerifyToken }

