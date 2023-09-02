const mongoose = require('mongoose');

const movixHistorySchema = new mongoose.Schema({
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
  },
});

const MovixHistory = mongoose.model('movixhistory', movixHistorySchema)

module.exports = MovixHistory
