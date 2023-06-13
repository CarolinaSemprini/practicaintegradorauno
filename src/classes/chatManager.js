export default class ChatManager {
  constructor() {
    this.chat = [];
  }

  async addMsg(msg) {
    try {
      this.chat.push(msg);
    } catch (err) {
      console.log("Error al enviar mensaje.");
    }
  }

  async getChat() {
    try {
      return this.chat;
    } catch (err) {
      console.log("Error al leer los mensajes.");
    }
  }
}
