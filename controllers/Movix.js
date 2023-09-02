const MovixHistory = require("../modals/Movix");

const movixLog = (req,res) => {
    try {
      const { url } = req;
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const time = new Date()
      const longitude = req.body.longitude
      const latitude = req.body.latitude

      const requestHistory = new MovixHistory({ url, time, ip : userIP,longitude, latitude });
      requestHistory.save()

      res.status(200).json({ msg: 'User verified' });
    } catch (e) {
      console.log(e)
      res.status(500).json({ msg: 'Internal server error' });
    }
}


const movixData = async (req,res) => {
  try {
    const pageno = parseInt(req.body.pageno) || 1;
    const pagelimit = parseInt(req.body.pagelimit) || 20;
    const skip = (pageno - 1) * pagelimit;
    
    const data = await MovixHistory.find().skip(skip).limit(pagelimit)

    const nextpage = data.length >= pagelimit ? 1 : 0

    res.status(200).json({pageno,pagelimit,data,nextpage})
    
} catch (error) {
    console.error('Error fetching logs', error)
    res.status(500).json({ error: 'Failed to fetch logs' })
}
}

module.exports = { movixLog, movixData }