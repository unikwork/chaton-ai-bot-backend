import config from "./src/config/config.js";
import app from "./src/app.js";
import { Server } from "socket.io";
import http from "http";

import socket from "./src/socket/index.js";

const server = http.createServer(app);
global.io = new Server(server, {
  cors: {
    origin: "*",
  },
});

await socket.socketIO(io);

server.listen(config.port, () => {
  console.log(`server is listening on port ${config.port}`);
});
