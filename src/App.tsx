import React, { useState, useEffect } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from "../types/events";

export type MitDiv = HTMLDivElement;


const socket: Socket<ServerToClientEvents, ClientToServerEvents> 
  = io('localhost:3001');

export type Coord = [number, number];

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', (msg) => {
      setLastMessage(msg);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    console.log("Sending message")
    socket.emit('hello');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
        <p>Last message: { lastMessage || '-' }</p>
        <button onClick={ sendMessage }>Say hello!</button>
      </header>
    </div>
  );
}

export default App;
