import { ProductsModel } from "../DAO/models/products.models.js";

class ProductService {
  async getAll() {
    const products = await ProductsModel.find({});
    if (!products) {
      throw new Error("products not found.");
    }
    return products;
  }

  async getOne(_id) {
    const product = await ProductsModel.findOne({ _id });
    if (!product) {
      throw new Error("product not found.");
    }
    return product;
  }

  async deleteOne(_id) {
    const productDelete = await ProductsModel.findByIdAndDelete(_id);
    if (!productDelete) {
      throw new Error("product not found.");
    }
    return productDelete;
  }

  async createOne(body) {
    const { title, description, category, price, code, stock } = body;
    const productCreated = await ProductsModel.create({
      title,
      description,
      price,
      category,
      code,
      stock,
    });
    return productCreated._id; // Devolver el _id del producto creado
  }

  async updateOne(_id, body) {
    const { title, description, category, price, code, stock } = body;
    const productUpdate = await ProductsModel.updateOne(
      { _id },
      {
        title,
        description,
        category,
        price,
        code,
        stock,
      }
    );
    return productUpdate;
  }
}

export const productService = new ProductService();
