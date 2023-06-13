import express from "express";
import { productService } from "../services/products.service.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "list products.",
      payload: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await productService.getOne(_id);
    return res.status(200).json({
      status: "succes",
      msg: "product found.",
      payload: product,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteProduct = await productService.deleteOne(_id);
    return res.status(200).json({
      status: "succes",
      msg: "product deleted.",
      payload: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error.",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const productCreated = await productService.createOne(body);
    return res.status(201).json({
      status: "success",
      msg: "product created.",
      payload: productCreated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

productsRouter.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    const productUpdate = await productService.updateOne(_id, body);
    return res.status(201).json({
      status: "succes",
      msg: "product updated.",
      payload: productUpdate,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});
