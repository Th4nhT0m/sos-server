const mongoose = require('mongoose');;
const {createServer} = require('http')
const express = require('express');
const server = express();
const httpServer = createServer(server);
const { Server } = require("socket.io");



const createSocketIO =(httpServer) => {
  const io = new Server(httpServer, {
    // path: "/accidents/",
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 30000,
    cookie: false
  });

  io.on("connection",(socket) => {
    console.log("connection socket");
    // console.log(socket.id);
    // socket.on("disconnect",() => {
    //   console.log("Disconnected"+socket.id);
    // });
  });

  // io.use()
  io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
}


module.exports = {
  createSocketIO,
};


// const mongoose = require('mongoose');
// const app = require('./app');
// const {createServer} = require('http')
// const config = require('./config/config');
// const logger = require('./config/logger');
// const express = require('express');
// const server = express();
// const httpServer = createServer(server);
// const { Server } = require("socket.io");
// const io = new Server(httpServer);
//
//
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');
//
//   httpServer.listen(config.port,() => {
//     console.log(`Server is running at PORT ${config.port}`);
//   });
//   // io.on('connection', (socket) => {
//   //   console.log('a user connected');
//   // });
//   //
//   // server.listen(3000, () => {
//   //   console.log('listening on *:3000');
//   // });
// });
