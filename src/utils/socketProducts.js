import { productService } from "../services/products.service.js";

export function handleProductSocket(socketServer) {

    if (!socketServer) {
        throw new Error("Socket server is undefined");
    }

    socketServer.on("connection", (socket) => {
        const emitProductList = async () => {
            try {
                const products = await productService.getAll();
                socket.emit("new-products-list", products);
            } catch (error) {
                console.log(error);
            }
        };
        emitProductList();

        socket.on("add-product", async (newProduct) => {
            try {
                const createdProductId = await productService.createOne(newProduct);
                newProduct._id = createdProductId; // Asignar el _id generado al objeto newProduct
                emitProductList();
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("delete-product", async (productId) => {
            try {
                await productService.deleteOne(productId);
                console.log(`Producto eliminado _id:${productId}`);
                emitProductList();
            } catch (error) {
                console.log(error);
            }
        });
    });
}
