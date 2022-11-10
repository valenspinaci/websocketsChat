const express = require("express");
const {Server, Socket} = require("socket.io");
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, console.log(`Servidor inicializado en el puerto ${PORT}`));

app.use(express.static(__dirname + "/public"));

//Configurar servidor de websockets
const io = new Server(server);

const messages = [
    {author:"Juan", text:"Hola, que tal!"},
    {author:"Pedro", text:"Muy bien! Y vos?"},
    {author:"Ana", text:"Genial!"}
]

//Detectar cada conexion
io.on("connection", (socket)=>{
    console.log("Un nuevo usuario se ha conectado", socket.id)

    socket.emit("mensajes", messages);

    //Recibimos nuevos mensajes
    socket.on("newMessage", (data)=>{
        messages.push(data);
        //Enviar los mensajes a los usuarios conectados
        io.sockets.emit("mensajes", messages)
    })
})