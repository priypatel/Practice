import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required field",
      });
    }
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
    });
    res.status(201).json({
      success: true,
      message: "Product Created successfully.",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log("error:", err.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.imageUrl = imageUrl ?? product.imageUrl;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log("error:", err.message);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
