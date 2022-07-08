const express = require("express");
const router = require('./router/productRouter')
require("./db/mongoose");

const app = express();
const port = 5000;

app.use(router)
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
