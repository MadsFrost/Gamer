import { Vector } from "vecti";
import { Player } from "./player";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (msg: string) => void;
  player_update: (socket_id: string, player: Player) => void;
  player_leave: (socket_id: string) => void;
}

// Take client actions and send them to the server
export interface ClientToServerEvents {
  hello: () => void;
  send_username: (username: string) => void;
  move: (offset: Vector) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}