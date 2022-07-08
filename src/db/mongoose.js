const mongoose = require('mongoose')

//connnecting to database
mongoose.connect('mongodb+srv://taskapp:flHgkBFI2Xs3FRCs@cluster0.1yq8m.mongodb.net/product-data-api', {
  useNewUrlParser: true
})