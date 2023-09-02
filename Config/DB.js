const mongoose = require("mongoose")
const { MONGO_URL } = require("./Config")

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