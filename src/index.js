const express = require('express')
const Product = require('./model/product')
require('./db/mongoose')

const app = express()
const port = 3000

//create instance of model
const productDetail = new Product({
  name: 'Shop',
  quantity: 11,
  description: 'any brand should work'
})

//save to product collection
productDetail.save()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/product', async (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})