import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import helmet from "helmet";
import './Config/DB.js'
import router from "./route.js"

dotenv.config()
const app = express()

const Port = process.env.PORT || 8080

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/',router)

app.listen(Port,'0.0.0.0', () => {
  console.log(`Server start on port ${Port}`)
})
