import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({});
    if (carts.length === 0) {
      throw new Error("No carts found.");
    }
    return carts;
  }

  async getOne(_id) {
    const cart = await CartsModel.findById(_id);
    if (!cart) {
      throw new Error("Cart not found.");
    }
    return cart;
  }

  async createCart() {
    const newCart = new CartsModel();
    await newCart.save();
    return newCart;
  }

}

export const cartService = new CartService();
