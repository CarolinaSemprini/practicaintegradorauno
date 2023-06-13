import { Schema, model } from "mongoose";

const schema = new Schema({
  users: {
    type: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
    default: [],
  },
  products: {
    type: [{ product: { type: Schema.Types.ObjectId, ref: "products" } }],
    default: [],
  },
});

export const CartsModel = model("carts", schema);
