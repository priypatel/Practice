import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`server connected on ${PORT}`);
});
