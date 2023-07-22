export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: (msg: string) => void;
  }
  
  // Take client actions and send them to the server
export interface ClientToServerEvents {
    hello: () => void;
  }
  
export interface InterServerEvents {
    ping: () => void;
  }
  
export interface SocketData {
    name: string;
    age: number;
  }