const Product = require("../models/productModel");
const mongoose = require("mongoose");

//GET / products;
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// POST /products
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create product  ", error: error.message });
  }
};

// GET /products/:productId
const getProductById = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId)
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json("unable to find id")
    }
  } catch (error) {
    res.status(500).json("unable to connect to the server")
  }
};

// PUT /products/:productId
const updateProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { ...req.body },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct)
    } else {
      res.status(400).json("unable to find id")
    }
  } catch (error) {
    res.status(500).json("unable to retrieve products")
  }
};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
  const {productId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const deleteProduct = await Product.findByIdAndDelete({ _id: productId });

    if (deleteProduct) {
      res.status(200).json("Product has been deleted")
    } else {
      res.status(404).json("unable to delete product")
    }
  } catch (error) {
    res.status(500).json("unable to retrieve product by id")
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};