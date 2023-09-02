const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
require('./Config/DB')

const Port = process.env.PORT || 8080

const router = require("./route")

app.use(express.json())
app.use(cors())

app.use('/',router)

app.listen(Port,'0.0.0.0', () => {
  console.log(`Server start on port ${Port}`)
})
