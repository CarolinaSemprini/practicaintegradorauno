import { MsgModel } from "../DAO/models/msgs.models.js";

export function setupChatSocket(socketServer) {
    socketServer.on("connection", (socket) => {
        socket.on("msg-chat", async (msg) => {
            try {
                await MsgModel.create(msg);
                const chat = await MsgModel.find({});
                socketServer.emit("list-chat", chat);
            } catch (err) {
                console.log(err);
            }
        });
    });
}
