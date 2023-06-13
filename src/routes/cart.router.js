import express from "express";
import CartManager from "../classes/cartManager.js";
import { cartService } from "../services/carts.service.js";

const cartManager = new CartManager("./src/data/cart.json");

export const cartRouter = express.Router();

cartRouter.get("/get", async (req, res) => {
  try {
    const carts = await cartService.getAll();
    return res.status(200).json({
      status: "succes",
      msg: "all carts.",
      payload: carts,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
      payload: {},
    });
  }
});

cartRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const cart = await cartService.getOne(_id);
    return res.status(200).json({
      status: "succes",
      msg: "cart.",
      payload: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      payload: {},
    });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    return res.status(200).json({
      status: "succes",
      msg: "Carrito creado.",
      payload: newCart,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
});

/* cartRouter.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartByID(cid);
    if (cart) {
      return res.status(200).json({
        status: "succes",
        msg: "Carrito solicitado.",
        payload: cart,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      msg: err.message,
    });
  }
}); */

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const body = req.body;
    console.log(body, cid, pid);
    const carts = await cartService.addToCart(cid, pid, body);
    return res.status(200).json({
      status: "succes",
      msg: "product added.",
      payload: carts,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      msg: error.message,
      payload: {},
    });
  }
});

/* cartRouter.post("/:cid/product/:_id", async (req, res) => {
  try {
    const cid = req.params.cid;
    const _id = req.params._id;
    await cartManager.addProductToCart(cid, _id);
    return res.status(200).json({
      status: "succes",
      msg: "carrito actualizado",
      payload: cartManager.carts.find((c) => c.cid == cid),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 */
