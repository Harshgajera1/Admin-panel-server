const mongoose = require('mongoose')

const signInSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

const signInModel = mongoose.model("signin", signInSchema);

module.exports = signInModel