const express = require("express");
const Product = require("../model/product");

const router = new express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Product data API</h1>");
});

//Create new product
router.post("/product", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//fetch product by name
router.get("/product/:name", async (req, res) => {
  try {
    const product = await Product.find({ name: req.params.name });

    if (!product) {
      return res.status(404).send({ error: "Product not found!" });
    }

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//fuzzy search
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    const agg = [
      {
        $search: {
          autocomplete: {
            query: name,
            path: "name",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $limit: 5,
      },
      {
        
        $project: {
          _id: 0,
          name: 1,
          description: 1,
          quantity: 1
        },
      },
    ];

    const response = await Product.aggregate(agg);
    return res.json(response)
  } catch (e) {
    res.status(400).send(e);
  }
});

//fetch product by id
router.get("/product/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete prouduct
router.delete("/product/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update product
router.patch("/product/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "quantity", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
