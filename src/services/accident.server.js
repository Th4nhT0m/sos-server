const httpStatus = require('http-status');
const { Accident } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a accident
 * @param {Object} accidentBody
 * @returns {Promise<Accident>}
 */
const createAccident = async (accidentBody) => {
  return Accident.create(accidentBody);
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
  return Accident.findById(id);
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
 * update accident bu id
 * @param {ObjectId} accidentId
 * @param {Object} updateBody
 * @returns {Promise<Accident>}
 */
const updateAccidentById = async (accidentId, updateBody) => {
  const accident = await getAccidentById(accidentId);
  if (!accident) {
    throw new ApiError(httpStatus.NOT_FOUND,'User not found');
  }
  Object.assign(accident, updateBody);
  await  accident.save();
  return accident;
}

module.exports = {
  createAccident,
  getAccidentById,
  getAccidentByStatus,
  deleteAccidentById,
  updateAccidentById,
  queryAccident
};
