import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../types/events";
import { Player } from "../types/player";
import { Vector } from "vecti";


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

const playerDict: { [key: string]: Player } = {};


io.on('connection', socket => {

  playerDict[socket.id] = {
    name: "default",
    position: Vector.of([0, 0]),
    rotation: 0
  }

  console.log('a user connected');
  // console.log(JSON.stringify(playerDict, null, 2));

  // give the client the current state of the game
  for (let key in playerDict) {
    let player = playerDict[key]!;
    socket.emit('player_update', key, player);
  }


  socket.on('send_username', (username: string) => {
    playerDict[socket.id]!.name = username;
    io.emit('player_update', socket.id, playerDict[socket.id]!);
  });

  socket.on('move', (offset: Vector) => {
    console.log(`move: ${offset}`);
    playerDict[socket.id]!.position = playerDict[socket.id]!.position.add(offset);
    io.emit('player_update', socket.id, playerDict[socket.id]!);
  });

  socket.on('disconnect', () => {
    delete playerDict[socket.id];
    io.emit('player_leave', socket.id);
  });

});

io.listen(3001);

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to read keyboard input asynchronously
const readKeyboardInput = (): Promise<string> => {
  return new Promise((resolve) => {
    rl.question('', (input: string) => {
      rl.close();
      console.log(`Received: ${input}`);
      resolve(input);
    });
  });
};


const main = async () => {
  // Read keyboard input
  while (true) {
    let input = await readKeyboardInput();
    console.log(`Received: ${input}`);
    if (input.toLowerCase() === "p") {
      console.log(JSON.stringify(playerDict, null, 2));
    }
  };
};

main();