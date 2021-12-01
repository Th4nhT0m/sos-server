const socketIo = express();
const http = require('http').Server(socketIo);
const io = require('socket.io');
const socketIo = io(http);


socketIo.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
  http.listen(3000, () => {
    console.log('connected to port: ' + 3000)

  });
})

export default socketIo;
