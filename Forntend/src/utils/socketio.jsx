import { io } from "socket.io-client";

export const socket = io("https://jobnest-backend-wld8.onrender.com", {
  transports: ["websocket"],
});
