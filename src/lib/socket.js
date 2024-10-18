import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      path: "/api/socketio",
    });

    io.on("connection", (socket) => {
      console.log("Client connected", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized");
  return io;
};
