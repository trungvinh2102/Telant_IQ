import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", socket => {
    console.log(`[socket] 📡 Client connected: ${socket.id}`);

    socket.on("join-room", (roomCode: string) => {
      socket.join(roomCode);
      console.log(`[socket] 👥 Client ${socket.id} joined room: ${roomCode}`);
      socket.to(roomCode).emit("user-joined", { userId: socket.id });
    });

    socket.on("code-change", (data: { roomCode: string; code: string }) => {
      socket.to(data.roomCode).emit("code-update", data.code);
    });

    socket.on("cursor-move", (data: { roomCode: string; cursor: unknown }) => {
      socket.to(data.roomCode).emit("cursor-update", {
        userId: socket.id,
        cursor: data.cursor,
      });
    });

    socket.on("disconnect", () => {
      console.log(`[socket] 🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
