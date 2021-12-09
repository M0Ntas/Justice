const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
})

module.exports = mongoose.model('users', userSchema)