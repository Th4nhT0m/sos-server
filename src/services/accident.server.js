const httpStatus = require('http-status');
const { Accident } = require('../models');
const ApiError = require('../utils/ApiError');
const Joi = require('joi');

/**
 * Create a accident
 * @param {Object} accidentBody
 * @param {Object} userId
 * @returns {Promise<Accident>}
 */
const createAccident = async (accidentBody,userId) => {
  const accidentCre =  await Accident.create({
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
  return accidentCre;
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
