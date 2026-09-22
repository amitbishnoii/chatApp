import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import app from "./app.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./socket.js";

const httpServer = createServer(app);
const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
);

io.on("connection", () => {
    console.log("socket connected");
});

httpServer.listen(3000, () => {
    console.log("server listening on port 3000");
});
