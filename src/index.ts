import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    ws.on("error", console.error);
    console.log("client connected!");
    ws.send("Hello from server!");

    ws.on("message", (data, isBinary) => {
        wss.clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send("Client sent: " + data, { binary: isBinary });
            }
        });
    });

    ws.on("close", () => {
        console.log("Client left");
    });
});

app.get("/", function (req, res) {
    res.send("Hello there!");
});

server.listen(8080, () => console.log("Server is live on port 8080"));
