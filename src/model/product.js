const mongoose = require('mongoose')

//create model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product