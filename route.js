const express = require('express')
const { signIn, login } = require('./controllers/SignIn')
const { GenerateToken, VerifyToken } = require('./controllers/Token')
const { portfolioLog, ListPortfolioData, ListPortfolioForm, InsertPortfolioForm } = require('./controllers/PortfolioWebsite')
const { movixLog, movixData } = require('./controllers/Movix')
const { sendResponse } = require('./Config/Config')

const router = express.Router()

  // live projects History Api  
  router.post('/portfolio',portfolioLog)
  router.post('/portfolioform',ListPortfolioForm,sendResponse)
  router.post('/portfolioform/insert',InsertPortfolioForm,sendResponse)
  router.post('/movix',movixLog)

  router.post('/portfoliodata',ListPortfolioData)
  router.post('/movixdata',movixData)
  router.post('/portfolioform',movixData)

  router.post("/register",signIn)
  
  router.post("/login", login)

  router.post('/getacesstoken', GenerateToken, sendResponse)
  router.post('/verifytoken', VerifyToken, sendResponse)

  module.exports = router