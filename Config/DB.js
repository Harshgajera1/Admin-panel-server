import mongoose from "mongoose"
import { MONGO_URL } from "./Config.js"

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully!')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })