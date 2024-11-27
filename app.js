require('dotenv').config()
const mongoose = require('mongoose')
const prompt = require('prompt-sync')()
const Customer = require('./models/customer')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("it's connected")
}

const creteCustomer = async () => {
  const name = prompt('Enter Customer name: ')
  const age = prompt('Enter your age: ')
  const customerData = {
    name: name,
    age: age
  }
  const customer = await Customer.create(customerData)
  console.log('Customer Created!', customerData)
}

const viewAllCustomers = async () => {
  const customers = await Customer.find()
  console.log('these are all the customers: ')
  customers.forEach((customer) => {
    console.log(`${customer.id}(${customer.name}) (${customer.age})`)
  })
}
const updateCustomer = async () => {
  const id = prompt('What ID you want to update? ')
  const newName = prompt('Enter the new name: ')
  const newAge = prompt('Enter the new age: ')

  const customer = await Customer.findByIdAndUpdate(id, {
    name: newName,
    age: newAge
  })
  console.log('Updated succesfully:', customer)
}
const deleteCustomer = async () => {
  const id = prompt('write the id the you want it to be deleted: ')
  await Customer.findByIdAndDelete(id)
  console.log('this customer is deleted sucssesfully')
}

const menu = async () => {
  await connect()

  while (true) {
    console.log('welcome to the CRM')
    console.log('1. create a customer')
    console.log('2. view all customers')
    console.log('3. update a customer')
    console.log('4. delete a customer')
    console.log('5. exit')

    const choices = prompt('Enter your choice: ')
    switch (choices) {
      case '1':
        await creteCustomer()
        break
      case '2':
        await viewAllCustomers()
        break
      case '3':
        await updateCustomer()
        break
      case '4':
        await deleteCustomer()
        break
      case '5':
        console.log('Exiting from menu')
        process.exit()
      default:
        console.log('invalid choice, please try again')
    }
  }
}
// const username = prompt('What is your name? ')

// console.log(`Your name is ${username}`)

menu()
