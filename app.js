require('dotenv').config()
const mongoose = require('mongoose')

const Customer = require('./models/customer')
const prompt = require('prompt-sync')()

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("it's connected")
  await creteCustomer()
  await runQueries()
  // await updateCustomer()
  process.exit()
}

const runQueries = async () => {
  console.log('queries are running')
  await findCustomer()
}
const creteCustomer = async () => {
  const customerData = {
    name: 'Mosa jameel',
    age: 21
  }
  const customer = await Customer.create(customerData)
  console.log('New Customer', customer)
}

const username = prompt('What is your name? ')

console.log(`Your name is ${username}`)

connect()
const findCustomer = async () => {
  const customer = await Customer.findById('')
  console.log('This is the customer you search for:', customer)
}

const id = prompt('What ID you search for? ')
const updateCustomer = await Customer.findByIdAndUpdate(
  id,
  { name: 'ali' },
  { age: 88 }
)
