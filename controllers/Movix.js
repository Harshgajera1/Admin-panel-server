import { resMessages } from "../Config/Config.js";
import Methods from "../Config/Methods.js";
import movixHistorySchema from "../modals/Movix.js"
var collectionName = 'movixhistory'

// Movix Project log
const LogMovixLog = async (req, res, next) => {
    try {
      const { url } = req;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const time = new Date()
      const longitude = req.body.longitude
      const latitude = req.body.latitude
      const data = { url, time, ip : userIP,longitude, latitude }

      const resp = await Methods.performCRUD('i',collectionName,movixHistorySchema,data)
      req.responseData = {status : resp.status, message : resMessages['userlog']}
      next()
    } catch (e) {
      console.log(e)
      req.responseData = {status : 500, message : resMessages['error']}
      next()
    }
}

// Movix Project data
const ListMovix = async (req, res, next) => {
  try {
    let paginationInfo = req.body.paginationinfo
    let pipeline = [{$sort : {_id: 1}}]

    const resp =  await Methods.getData(collectionName, movixHistorySchema, pipeline, paginationInfo)
    
    req.responseData = resp
    next()
  } catch (e) {
    console.log(e)
    req.responseData = { status: 500, message : resMessages['error'] }
    next()
  }
}

export { LogMovixLog, ListMovix }