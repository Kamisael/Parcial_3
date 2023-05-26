console.log('hello world');

const express = require('express');
const http = require('http');
const { dbConnection } = require('./database/config');

require('dotenv').config();


const app = express();
dbConnection();

app.use(express.static('public'));
app.use(express.json());


const server = http.createServer(app);


const io = require('socket.io')(server);

io.on("connection", (socket) => {
  console.log(`Usuario: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Escuchar en el puerto especificado en el archivo .env
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log('Servidor corriendo en puerto', port);
});
