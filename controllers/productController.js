const product = require("../models/product");
const bodyParser = require("body-parser");
const { error, success } = require("../utlis/responseWrapper");

const addNewProducts = async (req, res) => {
  console.log("add new product invoked");
};

module.exports = { addNewProducts };
