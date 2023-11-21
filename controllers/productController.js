const Product = require("../models/product");
const bodyParser = require("body-parser");
const { error, success } = require("../utlis/responseWrapper");

const addNewProducts = async (req, res) => {
  try {
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
    return res.status(403).json({
      message: "Product already exists"
    })
  }

  const product = await Product.create({
    image: image,
    id: id,
    count: count,
    name: name,
    description: description,
    price: price,
    minCount: minCount,
  });

  return res.status(200).json({
    message: "Product added successfully!"
  })

  } catch (err) {
    return res.status(501).json({
      message: "Server error!"
    })
  }
};

const findProductById = async (id) => {
  const product = await Product.findOne({ id });
  return product;
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json(products)
  }
  catch(err)
  {
    console.log(err)
    return res.status(501).json({
      message: "Server error!"
    })
  }
}

module.exports = { addNewProducts, getAllProducts };
