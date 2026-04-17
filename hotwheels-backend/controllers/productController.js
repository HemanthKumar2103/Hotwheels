const Product = require("../models/Product");
const ADMIN_EMAILS = ["admin@gmail.com"];

exports.addProduct = async (req, res) => {
  const { email } = req.body;

  if (!ADMIN_EMAILS.includes(email)) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const { name, price, images, description } = req.body;

    const product = new Product({
      name,
      price,
      images,
      description
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding product" });
  }
};

// GET PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};