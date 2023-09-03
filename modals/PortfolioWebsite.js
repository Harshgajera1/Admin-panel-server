import mongoose from 'mongoose'

const portfolioHistorySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: false,
  },
  latitude: {
    type: String,
    required: false,
  }
})

export default portfolioHistorySchema