import React, { useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from "../types/events";
import PlayerComponent from './components/Player';
import Username from './components/Username';
import { Player } from 'types/player';
import useArrowKeys from './hooks/arrowKeyEvents';
import { Vector } from 'vecti';


const socket: Socket<ServerToClientEvents, ClientToServerEvents>
  = io('localhost:3001');


function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);

  const [playerDict, setPlayerDict] = useState<{ [key: string]: Player }>({});

  const input = useArrowKeys();

  useEffect(() => {
    if (playerDict[socket.id] === undefined) {
      return;
    }

    
    const nonZero = input.x !== 0 ? input.x : input.y;
    console.log({"i": input, "o": nonZero})
    // if (nonZero === 0) {
    //   return;
    // }
  
    const oldpos = playerDict[socket.id]!.position;
    const newpos : Vector = new Vector(oldpos.x, oldpos.y).add(input).multiply(5);
    playerDict[socket.id]!.position = newpos;
    socket.emit('move', input);
  
  }, [input, playerDict]);

  function player_update(socket_id: string, player: Player) {
    const d = { ...playerDict };
    d[socket_id] = player;
    setPlayerDict(d);
  }

  function player_delete(socket_id: string) {
    const d = { ...playerDict };
    delete d[socket_id];
    setPlayerDict(d);
  }

  socket.on('connect', () => {
    setIsConnected(true);
  });

  socket.on('disconnect', () => {
    setIsConnected(false);
  });

  socket.on('player_update', (socket_id: string, player: Player) => {
    player_update(socket_id, player);
  });

  socket.on('player_leave', (socket_id: string) => {
    player_delete(socket_id);
  });

  useEffect(() => {
  }, [playerDict]);


  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Socket ID: {socket.id}</p>
      <Username socket={socket} />
      <p>{JSON.stringify(playerDict, null, 4)}</p>
      {Object.keys(playerDict).map((socket_id) => {
        return <PlayerComponent player={playerDict[socket_id]!} />
      })}
    </div >
  );
}

export default App;
