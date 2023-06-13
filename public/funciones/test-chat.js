const socket = io();

const chatBox = document.getElementById("input-msg");

let emailIngresado = "";

async function main() {
  const email = prompt("Su correo");

  if (!email) {
    alert("Se requiere su correo");
    return;
  }

  emailIngresado = email;
}

main();

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    console.log(chatBox.value);
    socket.emit("msg-chat", {
      message: chatBox.value,
      user: emailIngresado,
    });
    chatBox.value = "";
  }
});

socket.on("list-chat", (chat) => {
  const divMsgs = document.getElementById("div-msgs");
  divMsgs.innerHTML = "";
  chat.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("msgs");
    div.innerHTML = `
    <p class="chat-color">${msg.user}: ${msg.message}</p>
    `;
    divMsgs.appendChild(div);
  });
});
