const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

console.log('Started server at 8082!');
const messages = [];

wss.on("connection", (ws) => {
  console.log("new client!!");

  // Send all existing messages to the new client
  ws.send(JSON.stringify(messages));

  ws.on("message", (data) => {
    console.log(`Received ${data}`);
    const message = JSON.parse(data);
    messages.push(message);

    // Broadcast the new message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messages));
      }
    });
    console.log(messages);
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});
