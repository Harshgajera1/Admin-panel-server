import mongoose from 'mongoose'

const tokenExpireSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  tokenAge: {
    type: String,
    required: true,
  },
  tokenExpiration: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ip: {
    type: String,
    required: true,
  },
})

export default tokenExpireSchema