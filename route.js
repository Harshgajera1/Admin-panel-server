import express from 'express'
import { SignIn, Login } from './controllers/SignIn.js'
import { GenerateToken, VerifyToken } from './controllers/Token.js'
import { LogPortfolio, ListPortfolio, ListPortfolioForm, InsertPortfolioForm } from './controllers/PortfolioWebsite.js'
import { LogMovixLog, ListMovix } from './controllers/Movix.js'
import { sendResponse } from './Config/Config.js'

const router = express.Router()

// portfolio website Api's
router.post('/portfoliolog', LogPortfolio, sendResponse)
router.post('/portfolio', ListPortfolio, sendResponse)
router.post('/portfolioform/insert', InsertPortfolioForm, sendResponse)
router.post('/portfolioform', ListPortfolioForm, sendResponse)

// Movix Project Api's
router.post('/movixlog', LogMovixLog, sendResponse)
router.post('/movix', ListMovix, sendResponse)

// Admin panel
router.post("/signin", SignIn, sendResponse)
router.post("/login", Login, sendResponse)
router.post('/getacesstoken', GenerateToken, sendResponse)
router.post('/verifytoken', VerifyToken, sendResponse)

export default router