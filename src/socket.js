import { io } from "socket.io-client";

const socket = io("https://chat-backend-v8ez.onrender.com");

export default socket;
