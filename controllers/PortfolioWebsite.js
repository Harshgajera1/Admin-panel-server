const Methods = require("../Config/Methods");
const PortfolioHistory = require("../modals/PortfolioWebsite");
const PortfolioForm = require("../modals/PortfolioForm");
const { resMessages } = require("../Config/Config");

const portfolioLog = async (req,res) => {
    try {
      const { url } = req;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const time = new Date()
      const longitude = req.body.longitude
      const latitude = req.body.latitude
      let data = { url, time, ip : userIP,longitude, latitude}
      // console.log(data)
      const requestHistory = new PortfolioHistory(data);
      requestHistory.save()

      res.status(200).json({ msg: 'User verified' });
    } catch (e) {
      console.log(e)
      res.status(500).json({ msg: 'Internal server error' });
    }
}

const ListPortfolioForm = async (req,res,next) =>{
  try {
    let resp = await Methods.getDate('portfoliocontactform',PortfolioForm,req.body)
    res.data = resp
    next()
  } catch (e) {
    res.data = {status : 500, message : resMessages['error']}
    next()
  }
}

const InsertPortfolioForm = async (req, res, next) =>{
  try {
    const resp = await Methods.performCRUD('d','portfoliocontactform', PortfolioForm, req.body)
    
    res.data = resp
    next()
  } catch (e) {
    console.log(e)
    res.data = { status: 500, message : resMessages['error'] }
    next()
  }
}

const ListPortfolioData = async (req,res) => {
  try {

    const pageno = parseInt(req.body.pageno) || 1;
    const pagelimit = parseInt(req.body.pagelimit) || 20;
    const skip = (pageno - 1) * pagelimit;
    
    const data = await PortfolioHistory.find().skip(skip).limit(pagelimit)

    const nextpage = data.length >= pagelimit ? 1 : 0

    // console.log({pageno,pagelimit,nextpage})

    // const geo = geoip.lookup('157.32.215.75');
    // if (geo && geo.ll) {
    //   const { ll } = geo;
    //   console.log(geo)
    //   console.log({ latitude: ll[0], longitude: ll[1] })
    // } else {
    //   console.log('error')
    // }

    // const response = await axios.get(`https://api.ip2location.com/v2/?key=${'dzNdoFH5d7y00ZTM1vAivHbERFLTv9fzGeNGz0mreaCNsklkhFScJH0vJEeB8iwQ'}&ip=${'157.32.215.75'}&package=WS10`);
    // const response = await axios.get(`http://ip-api.com/json/${'157.32.238.80'}`);
    // console.log(response)

    res.status(200).json({pageno,pagelimit,data,nextpage})
  } catch (error) {
      console.error('Error fetching logs', error)
      res.status(500).json({ error: 'Failed to fetch logs' })
  }
}

module.exports = { portfolioLog, ListPortfolioData, ListPortfolioForm, InsertPortfolioForm }