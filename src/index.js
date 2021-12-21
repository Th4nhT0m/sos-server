const mongoose = require('mongoose');
const app = require('./app');
const {createServer} = require('http')
const config = require('./config/config');
const logger = require('./config/logger');
const io = require('socket.io');
const { log } = require('winston');
const { User, Socket } = require('./models');
const { connectSocket, getUserSocketById } = require('./services/socket.server');
const { socketServer } = require('./services');
const httpSocket = createServer(app);
const ConnectSocket = io(httpSocket);
const httpServer = createServer(app);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  httpServer.listen(config.port,() => {
    console.log(`Server is running at PORT ${config.port}`);
  });
  httpSocket.listen(3000, () => {
    console.log('connected to port: ' + 3000)
    ConnectSocket.on('connection',async socket => {
      console.log('Id socket : ' + socket.id);
      console.log(socket.handshake.auth.token);
      const user = await getUserById(socket.handshake.auth.token);
      socket.request.user = user;
      await Socket.create ({
          userID: socket.handshake.auth.token,
          socketID: socket.id,
      })
      socket.on('sentHelp',data =>{
      if (socket.request.user ===null)
      {
        console.log('No connection Socket');
      }else {
        socket.broadcast.emit('getHelp',data);
        console.log('Helper-----------');
      }
      });

      socket.on('sentAccidents',data =>{
        if (socket.request.user === null)
        {
          console.log('No connection Socket');
        }else {
          socket.emit('getAccidents',data);
        }
      });

      socket.on("disconnect", () => {
        console.log('Disconnected socket connection: '+socket.id);
        socketServer.deleteSocketById(socket.request.user.id);
      })
      //
      socket.on("connection_error", (err) => {
        console.log(err.req);      // the request object
        console.log(err.code);     // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
        console.log(err.context);  // some additional error context
      });


      // socket.on('sentHelp',data =>{
      //     console.log(data);
      // console.log(socket.handshake.auth.token);
      // if (socket.handshake.auth.token ===null)
      // {
      //   console.log('No authentication')
      // }else {
      //   console.log(data)
      //   socket.emit('getHelp',data);
      // }
      // });
//
    });
  });
});
const getUserById = async (id) => {
  return User.findById(id);
};



const unexpectedErrorHandler = (error) => {
  logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
});
