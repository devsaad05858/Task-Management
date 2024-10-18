import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!io) {
    // Initialize the Socket.IO server
    io = new Server(res.socket.server, {
      path: "/api/socketio",
    });
    res.socket.server.io = io;

    // Handle new client connections
    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }
  res.end();
}
