import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../types/events";
// Events that the server can send to the client

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({
  cors: {
    origin: ['http://localhost:3000']
  }
});

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);
  console.log("connection hello")
  socket.on('hello', () => {
    console.log("hello")
    console.log(`hello from ${socket.id}`);
    console.log(`hello from ${socket.id}`);
    console.log("xd")
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3001);

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);
