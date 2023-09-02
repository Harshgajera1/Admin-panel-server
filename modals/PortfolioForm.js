const mongoose = require('mongoose');

const portfolioFormSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String
  }
})

module.exports = portfolioFormSchema
