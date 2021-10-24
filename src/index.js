const mongoose = require('mongoose');
const app = require('./app');
const {createServer} = require('http')
const config = require('./config/config');
const logger = require('./config/logger');
const io = require('./config/socket');
const { createSocketIO } = require('./config/socket');

let server;
let socket;
// config
const httServer = createServer(app);
createSocketIO(httServer);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  // server = app.listen(config.port, () => {
  //   logger.info(`app Listening to port ${config.port}`);
  // });

  // socket = io.listen(config.portSocket.portS, () => {
  // logger.info(`socket Listening to port ${config.portSocket.portS}`);
  // });

  httServer.listen(config.port,() => {
    console.log(`Server is running at PORT ${config.port}`);
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
