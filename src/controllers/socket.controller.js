const catchAsync = require('../utils/catchAsync');
const { socketTypeServer } = require('../services');
const httpStatus = require('http-status');
const { createServer } = require('http');
const app = require('../app');
const io = require('socket.io');
const httpSocket = createServer(app);
const socket = io(httpSocket);
const {so} = require('../index');

const createSocketCon = catchAsync(async (req, res) => {
  // socket.on('connection', (socket) => {
     console.log('A user is connected' +so);
    const socketCon = socketTypeServer.connectSocket(req.user.id,so);
    console.log('ID_User: ' +req.user.id + 'ID_Socket:'+socket.id);
    res.status(httpStatus.CREATED).send(socketCon);
  // });
});

module.exports = {
  createSocketCon,
}
