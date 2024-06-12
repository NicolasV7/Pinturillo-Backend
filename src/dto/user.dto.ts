import { WebSocket } from 'ws';

export interface User {
  ws: WebSocket;
  userName: string;
  score: number;
}
