const mongoose = require('mongoose')

//connnecting to database
mongoose.connect('mongodb://127.0.0.1:27017/product-data', {
  useNewUrlParser: true
})