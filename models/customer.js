const mongoose = require('mongoose')

const customerInfo = new mongoose.Schema({
  name: String,
  age: Number
})

const Customer = mongoose.model('Customer', customerInfo)

module.exports = Customer
