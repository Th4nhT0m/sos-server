const {Socket, Accident } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {string} socketId
 * @returns {string}
 */
const connectSocket = async (userId, socketId) => {
  const socketIdentification = await Socket.create({
    userID:userId,
    socketId:socketId,
  });
  return socketIdentification;
};
const getUserSocketById = async (id) =>{
  return  Socket.findOne({userID:id})

};
const deleteSocketById = async (id) => {
  const socket = await getUserSocketById(id);
  if(!socket){
    throw new ApiError(httpStatus.NOT_FOUND,'Socket not found');
  }
  await Socket.remove();
};

module.exports={
  connectSocket,
  getUserSocketById,
  deleteSocketById,
}

