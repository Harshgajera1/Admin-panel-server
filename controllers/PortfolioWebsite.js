import Methods from "../Config/Methods.js"
import portfolioHistorySchema from "../modals/PortfolioWebsite.js"
import portfolioFormSchema from "../modals/PortfolioForm.js"
import { resMessages } from "../Config/Config.js"
import fs from 'fs'
import ejs from 'ejs'
import nodemailer from 'nodemailer'

var collectionName = 'portfoliohistory'

// Portfolio website log
const LogPortfolio = async (req, res, next) => {
    try {
      const { url } = req;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const time = new Date()
      const longitude = req.body.longitude
      const latitude = req.body.latitude
      let data = { url, time, ip : userIP,longitude, latitude}
      const resp = await Methods.performCRUD('i', collectionName, portfolioHistorySchema, data)

      req.responseData = {status : resp.status, message : resMessages['userlog']}
      next()
    } catch (e) {
      console.log(e)
      req.responseData = {status : 500, message : resMessages['error']}
    }
}

// Portfolio website data
const ListPortfolio = async (req, res, next) => {
  try {
    let paginationInfo = req.body.paginationinfo
    let pipeline = [{$sort : {_id: 1}}]

    const resp =  await Methods.getData(collectionName, portfolioHistorySchema, pipeline, paginationInfo)
    
    req.responseData = resp
    next()
  } catch (e) {
    console.log(e)
    req.responseData = { status: 500, message : resMessages['error'] }
    next()
  }
}

// Portfolio website contact form
const InsertPortfolioForm = async (req, res, next) =>{
  try {
    const resp = await Methods.performCRUD('i','portfoliocontactform', portfolioFormSchema, req.body)

    const emailTemplate = fs.readFileSync('./template/contactMail.ejs', 'utf-8')

    const data = {
      recipientName: 'Harsh',
      senderName: req.body.name,
      senderEmail: req.body.email,
      messageContent: req.body.message
    };

    const emailHtml = ejs.render(emailTemplate, data)

    // Create a Transporter object
    // const Transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //       type: 'OAuth2',
    //       user: process.env.MAIL_USERNAME,
    //       clientId: process.env.OAUTH_CLIENTID,
    //       clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //       refreshToken: process.env.OAUTH_REFRESH_TOKEN
    //   }
    // })
    const Transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      auth: {
          user: 'project.1',
          pass: 'secret.1'
      }
    })

    let mailOptions = {
      form : req.body.email,
      to : process.env.RECEIVE_MAIL,
      subject: 'Contact Mail',
      html: emailHtml,
    }

    Transporter.sendMail(mailOptions,(err,data)=>{
      if(err){
          console.log("Error ------- " + err)
      } else {
          console.log("Email sent successfully")
      }
    })
    
    req.responseData = {status : resp.status, message : resp.message}
    next()
  } catch (e) {
    console.log(e)
    req.responseData = { status: 500, message : resMessages['error'] }
    next()
  }
}

// Portfolio website contact form data
const ListPortfolioForm = async (req,res,next) =>{
  try {
    let pipeline = [{$sort : {_id: 1}}]
    let resp = await Methods.getData('portfoliocontactform', portfolioFormSchema, pipeline)
    req.responseData = resp
    next()
  } catch (e) {
    req.responseData = { status : 500, message : resMessages['error'] }
    next()
  }
}

export { LogPortfolio, ListPortfolio, ListPortfolioForm, InsertPortfolioForm }