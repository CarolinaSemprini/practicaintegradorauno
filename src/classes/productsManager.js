import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
  constructor(path) {
    this.path = path || './src/models/JSON/products.json';
  }

  async readProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.log('No se pudo leer el archivo productos.');
      return [];
    }
  }

  async writeProducts(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
      console.log('Archivo JSON actualizado correctamente.');
    } catch (err) {
      console.error('Error al actualizar el archivo JSON:', err);
    }
  }

  async getProducts(limit) {
    const products = await this.readProducts();
    if (limit) {
      return products.slice(0, limit);
    } else {
      return products;
    }
  }

  async getProductById(pid) {
    const products = await this.readProducts();
    const findProduct = products.find((product) => product.pid === pid);
    if (findProduct) {
      return findProduct;
    } else {
      throw new Error('Producto no encontrado.');
    }
  }

  async deleteProduct(pid) {
    const products = await this.readProducts();
    const index = products.findIndex((product) => product.pid === pid);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      await this.writeProducts(products);
      return deletedProduct;
    } else {
      throw new Error('Producto no encontrado para borrar.');
    }
  }

  async addProduct(product) {
    if (!ProductManager.isValidProduct(product)) {
      throw new Error('Producto inválido. Faltan campos obligatorios.');
    }

    const products = await this.readProducts();

    if (products.some((p) => p.code === product.code)) {
      throw new Error('Código de producto ya ingresado.');
    }

    const newProduct = {
      pid: nanoid(),
      createdAt: Date.now(),
      status: true,
      thumbnails: [],
      ...product,
    };

    products.push(newProduct);
    await this.writeProducts(products);
    return newProduct;
  }

  async updateProduct(pid, updatedFields) {
    const products = await this.readProducts();
    const productIndex = products.findIndex((product) => product.pid === pid);
    if (productIndex === -1) {
      throw new Error('No se pudo actualizar el producto. Producto no encontrado.');
    }
    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;
    await this.writeProducts(products);
    return updatedProduct;
  }

  static isValidProduct(product) {
    const requiredFields = ['title', 'description', 'category', 'price', 'code', 'stock'];
    return requiredFields.every((field) => product.hasOwnProperty(field));
  }
}

export default ProductManager;
