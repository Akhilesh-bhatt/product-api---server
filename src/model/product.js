const mongoose = require('mongoose')

//create model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  },
  images: {
    type: Buffer
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product