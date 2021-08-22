const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const listOfProducts = require("./data/products");
const listOfCountries = require("./data/countries");
const e = require("express");

const app = express();

//middleware

app.use(bodyParser.json());
app.use(cors());

//Get Products
app.get("/products", async (req, res) => {
  const products = await loadCollection("products");
  // await products.remove(); to clean the db
  if (!(await products.count())) {
    loadList(products, listOfProducts); // init db
  }
  res.send(await products.find({}).toArray());
  res.send(products);
});

//Get Countries
app.get("/countries", async (req, res) => {
  const countries = await loadCollection("countries");
  //await countries.remove();to clean the db
  if (!(await countries.count())) {
    loadList(countries, listOfCountries); // init db
  }
  res.send(await countries.find({}).toArray());
  res.send(countries);
});

app.post("/cogs", async (req, res) => {
  const products = await loadCollection("products");
  let { id } = req.body;
  products.findOne({ id }, function (err, product) {
    if (!err) {
      cogs = {
        $set: {
          productName: product.productName,
          cogs: { ...product.cogs, ...req.body.cogs }
        }
      };
      console.log(cogs);
      products.updateOne(
        { id: `${id}` },
        { $set: req.body },
        function (err, res) {
          if (err) throw err;
          console.log("product updated");
        }
      );
    } else {
      console.log(err);
    }
  });
  return res.status(201).send();
});

async function loadList(db, list) {
  console.log("===INSERT===");
  const result = await db.insertMany(list);

  console.log("===DONE===");
}

async function loadCollection(name) {
  const uri =
    "mongodb+srv://abc123:9LAqARdEjeFTdafm@cluster0.1oqdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  return client.db().collection(name);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
