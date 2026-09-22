import { createServer } from "http";
import app from "./app.js";
import { initSocket } from "./socket/index.js";

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(3000, () => {
    console.log("server listening on port 3000");
});
