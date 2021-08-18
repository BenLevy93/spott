const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const listOfProducts = require("./data/products");
const e = require("express");

const app = express();

//middleware

app.use(bodyParser.json());
app.use(cors());

// const products = require("./routes/products");
// const cogs = require("./routes/cogs");

// app.use("/products", products);
// app.use("/cogs", cogs);

//Get Products
app.get("/products", async (req, res) => {
  loadProducts();
  const products = await loadProductsCollection();
  if (!(await products.count())) {
    loadProducts(products); // init db
  }
  res.send(await products.find({}).toArray());
  res.send(products);
});

app.post("/cogs", async (req, res) => {
  const products = await loadProductsCollection();
  let { id } = req.body;
  products.findOne({ id }, function (err, product) {
    if (!err) {
      product.cogs = { ...product.cogs, ...req.body.cogs };
      product.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(400).send(err.message);
        }
      });
    } else {
      console.log(err);
    }
  });
  //await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  return res.status(201).send();
});

async function loadProducts(db) {
  console.log("===INSERT===");
  const result = await db.insertMany(listOfProducts);
  console.log(
    `products were inserted :)`,
    Object.values(result.insertedIds).length
  );
  console.log("===DONE===");
}

async function loadProductsCollection() {
  const uri =
    "mongodb+srv://abc123:9LAqARdEjeFTdafm@cluster0.1oqdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  return client.db().collection("products");
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
