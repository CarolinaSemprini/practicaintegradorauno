import express from "express";
import ProductManager from "../classes/productsManager.js";

const productManager = new ProductManager("./src/data/products.json");

export const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.status(200).render("home", { products, style: "main.css" });
  } catch (err) {
    return res.status(500).json({
      status: "Error.",
      msg: err.message,
    });
  }
});
