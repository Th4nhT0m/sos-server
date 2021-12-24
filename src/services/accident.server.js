const httpStatus = require('http-status');
const { Accident } = require('../models');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');
const admin = require('firebase-admin');
const { notificationAccident, notificationAccidentSuccess } = require('../utils/notification');



const token = "dwiF8FvwRGuM-w6q2N0waY:APA91bFhUrYkB_K5hpE1A0TMNAdyMv_c93Ofq-1tYQbcLqPaTUm45ET2HX5ZRA1YIf2uiaNZhXdRmDE4DPKkoc6dUYSONF96UP7QAY-hburqVBXBWjuqA-evYRlHttlA1QDG6bSGhWWZ";
const tokenB = "dznT53IVQVSlW9L-wqf247:APA91bEc5ERHXkF5mSWiizWF2OIJBlguJIB6qDCWxKL2pzlLM0ZS_I_Bne4uReqwnA1jVSoP7EWCrKBRh7_5vbqIqAOd82hIoB3vHyBDaFKITEhXHWnFLPtiAOs4ShsJUszLHqsMdq0u";


/**
 * Create a accident
 * @param {Object} accidentBody
 * @param {Object} userId
 * @returns {Promise<Accident>}
 */
const createAccident = async (accidentBody,userId) => {
  notificationAccident(tokenB);
  const accidentCreate =  await Accident.create({
    nameAccident:accidentBody.nameAccident,
    accidentType: accidentBody.accidentType,
    description: accidentBody.description,
    latitude: accidentBody.latitude,
    longitude: accidentBody.longitude,
    created_by: userId,
    modified_by: userId,
    createTime: Date.now(),
    UpdateTime: Date.now()
  });
  return accidentCreate;
};

/**
 * Query for accident
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAccident = async (filter, options) => {
  return await Accident.paginate(filter,options);
}

/**
 * Get accident by id
 * @param {ObjectId} id
 * @returns {Promise<Accident>}
 */
const getAccidentById = async (id) =>{
  return Accident.findById(id).populate('created_by',['name','numberPhone']);
};

/**
 /**
 * Query for accident
 * @param {ObjectId} userId
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAccidentByUserId = async (userId,options) =>{
  let result = await Accident.paginate({created_by:userId},options)
  return result;
};

/**
 * Get accident by status
 * @param {string}  status
 * @returns {Promise<Accident>}
 */
const getAccidentByStatus = async (status) =>{
  return Accident.findOne({status});
}

/**
 * Delete accident by id
 * @param {ObjectId} accidentId
 * @returns {Promise<Accident>}
 */
const deleteAccidentById = async (accidentId) => {
  const Accident = await getAccidentById(accidentId);
  if(!Accident){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  await Accident.remove();
  return Accident;
};

/**
 * update accident id
 * @param {ObjectId} accidentId
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Accident>}
 */
const updateAccidentById = async (accidentId, updateBody,userId) => {
  const accident = await getAccidentById(accidentId);
   notificationAccidentSuccess(tokenB);
  if (!accident) {
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  Object.assign(accident, {
    nameAccident:updateBody.nameAccident,
    accidentType: updateBody.accidentType,
    description: updateBody.description,
    latitude: updateBody.latitude,
    longitude: updateBody.longitude,
    modified_by: userId,
    status: updateBody.status,
    UpdateTime: Date.now(),
  });
  await  accident.save();
  return accident;
}

module.exports = {
  createAccident,
  getAccidentById,
  getAccidentByStatus,
  deleteAccidentById,
  updateAccidentById,
  queryAccident,
  getAccidentByUserId,
};
