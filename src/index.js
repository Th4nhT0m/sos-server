const mongoose = require('mongoose');
const app = require('./app');
const {createServer} = require('http')
const config = require('./config/config');
const logger = require('./config/logger');
const express = require('express');
const socketIo = express();
  const http = require('http').Server(socketIo);
const io = require('socket.io');
const ConnectSocket = io(http);

let server;
let socket;
const httpServer = createServer(app);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  httpServer.listen(config.port,() => {
    console.log(`Server is running at PORT ${config.port}`);
  });
  ConnectSocket.on('connection', (ConnectSocket)=>{
    console.log(ConnectSocket.id);
  });
  ConnectSocket.on('helper', (ConnectSocket)=>{
    console.log('Helper'+ConnectSocket.id);
  });
  // ConnectSocket.on('getAllAccidents',() => {
  //   ConnectSocket.emit('setAllAccidents',()=>{
  //     console.log('123');
  //   })
  //
  // });

  http.listen(3000, () => {
    console.log('connected to port: ' + 3000)

  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else if(socket){
    socket.close(() => {
      logger.info('socket closed');
      process.exit(1);
    });
  }else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
