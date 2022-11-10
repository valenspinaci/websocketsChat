console.log("Has sido conectado");

const chatContainer = document.getElementById("chatContainer");

const socketClient = io();

socketClient.on("mensajes", (data)=>{
    console.log(data);
    let messages = "";
    data.forEach(element =>{
        messages += `<p><span style="font-weight:bold">${element.author}:</span> ${element.text}</p>`
    });
    chatContainer.innerHTML = messages;
})

//Capturar nombre de usuario
let user = "";

Swal.fire({
    title: "Bienvenido!",
    text:"Ingresa tu nombre de usuario",
    input:"text",
    allowOutsideClick:false,
})
.then(response =>{
    user = response.value;
    document.getElementById("username").innerHTML = `Bienvenido ${user}!`;
})

//Enviar mensaje a servidor
const chatForm = document.getElementById("chatForm");
const messageChat = document.getElementById("messageChat");

chatForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("Formulario enviado");
    const newMessage = {
        author:user,
        text:messageChat.value
    };
    console.log(newMessage);
    socketClient.emit("newMessage", newMessage);
})