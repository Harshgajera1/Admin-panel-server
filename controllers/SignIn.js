import signInSchema from '../modals/SignInModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Methods from '../Config/Methods.js'
import { resMessages } from '../Config/Config.js'
var collectionName = 'signin'

const SignIn = async (req, res, next) => {
  try {
      const email = req.body.email
      const password = req.body.password

      const Model = await Methods.createModel(collectionName, signInSchema)
      const user = await Model.findOne({ email })

      if (!user) {
        const hashPass = await bcrypt.hash(password, 10)
        req.body.password = hashPass

        const resp = await Methods.performCRUD('i', collectionName, signInSchema, req.body)
        req.responseData = {status : resp.status, message : resMessages['signin']}
      } else {
        req.responseData = {status : 409, message : resMessages['emailinuse']}
      }
      next()
    } catch (err) {
      console.log(e)
      req.responseData = {status : 500, message : resMessages['error']}
      next()
    }
  }

  const Login = async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password
      const Model = await Methods.createModel(collectionName, signInSchema)
      const user = await Model.findOne({ email })

      if (user) {
        const response = await bcrypt.compare(password, user.password)
        if (response) {
          const payload = {
            nameemail : email
          }
          const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: '1h'})

          req.responseData = {status : 200, message : resMessages['login'], token}
        } else {
          req.responseData = {status : 401, message : resMessages['wrongpass']}
        }
      } else {
        req.responseData = {status : 404, message : resMessages['usernotexist']}
      }
      next()
    } catch (err) {
      console.log(e)
      req.responseData = {status : 500, message : resMessages['error']}
      next()
    }
  }

export {
  SignIn,
  Login
}
