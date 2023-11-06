const Product = require("../models/product");
const bodyParser = require("body-parser");
const { error, success } = require("../utlis/responseWrapper");

const addNewProducts = async (req, res) => {
  const image = req.body.image;
  const id = req.body.id;
  const count = req.body.count;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const minCount = req.body.minCount;

  //const existingProduct = await findProductById(id);
  const existingProduct = await Product.findOne({ id: id });
  if (existingProduct) {
    // Product already exists, so increase the count
    existingProduct.count += count;
    await existingProduct.save();
    console.log("product added ");
    // Send a message that the count was increased
    res.send(success(200, "Product count increased successfully!"));
    return;
  }

  const product = new Product({
    image: image,
    id: id,
    count: count,
    name: name,
    description: description,
    price: price,
    minCount: minCount,
  });

  try {
    await product.save();
    res.send(success(201, "Product added successfully!"));
  } catch (err) {
    console.log(err);
    res.send(error(500, "error while saving in dataBase"));
  }
};

const findProductById = async (id) => {
  const product = await Product.findOne({ id });
  return product;
};

module.exports = { addNewProducts };
