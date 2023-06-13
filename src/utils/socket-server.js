import { Server } from "socket.io";
import ProductManager from "../classes/productsManager.js";
import { handleProductSocket } from "./socketProducts.js";
import { setupChatSocket } from "./socketChat.js";
import { MsgModel } from "../DAO/models/msgs.models.js";


const productManager = new ProductManager("./src/data/products.json");


export function connectSocketServer(httpServer) {

  const socketServer = new Server(httpServer);
  handleProductSocket(socketServer);

  socketServer.on("connection", (socket) => {
    //setupChatSocket(socket);

    const emitProductList = async () => {
      const productsList = await productManager.getProducts();
      socket.emit("new-products-list", productsList);
    };
    emitProductList();

    socket.on("add-product", async (newProduct) => {
      try {
        console.log(newProduct);
        await productManager.addProduct(newProduct);
        emitProductList();
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("delete-product", async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        console.log(`Producto eliminado ID:${productId}`);
        emitProductList();
      } catch (err) {
        console.log(err);
      }
    });
    //setupChatSocket(socket, socketServer);

  });
}
