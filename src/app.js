import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.router.js";
import { homeRouter } from "./routes/home.router.js";
import { productsRouter } from "./routes/products.router.js";
import { realTimeProductsRouter } from "./routes/real-time-products.router.js";
import { chatRouter } from "./routes/test-chat-router.js";
import { usersRouter } from "./routes/users.router.js";
import { connectMongo } from "./utils/db-conection.js";
import { connectSocketServer } from "./utils/socket-server.js";
import { handleProductSocket } from "../src/utils/socketProducts.js";
import { setupChatSocket } from "./utils/socketChat.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

//PORT
export const httpServer = app.listen(PORT, () => {
  console.log(
    `App running on ${__dirname} - Servidor iniciado en puerto http://localhost:${PORT}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//MOTOR HANDLEBARS - Config Plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


connectMongo();
//const socketServer = connectSocketServer(httpServer);
//handleProductSocket(socketServer);

connectSocketServer(httpServer);
const socketServer = new Server(httpServer);
handleProductSocket(socketServer);

// SOCKET CHAT

setupChatSocket(socketServer);

//SOCKET
app.use("/real-time-products", realTimeProductsRouter);
app.use("/test-chat", chatRouter);

//API ENDPOINTS
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

//PLANTILLAS CON HTML
app.use("/", homeRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    error: "No se encuentra la ruta",
  });
});

