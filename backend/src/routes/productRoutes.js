import {
  createProduct,
  updateProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
} from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/", getAllProduct);
router.get("/:id", getOneProduct);
router.delete("/:id", deleteProduct);

export default router;
