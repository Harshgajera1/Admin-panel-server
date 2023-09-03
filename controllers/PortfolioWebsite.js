import Methods from "../Config/Methods.js"
import portfolioHistorySchema from "../modals/PortfolioWebsite.js"
import PortfolioForm from "../modals/PortfolioForm.js"
import { resMessages } from "../Config/Config.js"
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
    const resp = await Methods.performCRUD('i','portfoliocontactform', PortfolioForm, req.body)
    
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
    let resp = await Methods.getData('portfoliocontactform', PortfolioForm, pipeline)
    req.responseData = resp
    next()
  } catch (e) {
    req.responseData = { status : 500, message : resMessages['error'] }
    next()
  }
}

export { LogPortfolio, ListPortfolio, ListPortfolioForm, InsertPortfolioForm }