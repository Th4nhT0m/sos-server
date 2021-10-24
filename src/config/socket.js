const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

const app = module.exports.app = express();

const httpServer = http.createServer(app);

const createSocketIO =(httpServer) => {

  const io = new Server(httpServer, {
    // path: "http://localhost:3500/v1/accidents",
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  io.on("connection",(socket)=>{
    console.log("connection socket");
  });


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


