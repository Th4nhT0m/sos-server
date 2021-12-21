const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { string } = require('joi');

const socketSchema = new Schema ({
  userID:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  socketID:{
    type:String,
  }
});
const Socket = mongoose.model('Socket',socketSchema);
module.exports = Socket
