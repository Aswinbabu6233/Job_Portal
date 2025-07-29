import { io } from "socket.io-client";

export const socket = io("https://job-portal-backend-uifu.onrender.com", {
  transports: ["websocket"],
});
