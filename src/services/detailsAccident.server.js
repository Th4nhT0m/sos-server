const httpStatus = require('http-status');
const { DetailsAccident } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a details accident
 * @param {Object} detailsAccidentBody
 * @returns {Promise<DetailsAccident>}
 */
const createDAccident = async (detailsAccidentBody) => {
  return DetailsAccident.create(detailsAccidentBody);
};

/**
 * Query for details accident
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDAccident = async (filter, options) => {
  return await DetailsAccident.paginate(filter,options);
}

/**
 * Get accident by id
 * @param {ObjectId} id
 * @returns {Promise<Accident>}
 */
const getDAccidentById = async (id) =>{
  return DetailsAccident.findById(id);
};

/**
 * Get details accident by statusLog
 * @param {string}  statusLog
 * @returns {Promise<DetailsAccident>}
 */
const getDAccidentByStatus = async (statusLog) =>{
  return DetailsAccident.findOne({statusLog});
}

/**
 * Delete details accident by id
 * @param {ObjectId} detailsAccidentId
 * @returns {Promise<DetailsAccident>}
 */
const deleteAccidentById = async (detailsAccidentId) => {
  const deleteDAccident = await getDAccidentById(detailsAccidentId);
  if(!deleteDAccident){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  await deleteDAccident.remove();
  return deleteDAccident;
};

/**
 * update accident bu id
 * @param {ObjectId} detailsAccidentId
 * @param {Object} updateBody
 * @returns {Promise<DetailsAccident>}
 */
const updateAccidentById = async (detailsAccidentId, updateBody) => {
  const updateDAccident = await getDAccidentById(detailsAccidentId);
  if (!updateDAccident) {
    throw new ApiError(httpStatus.NOT_FOUND,'User not found');
  }
  Object.assign(updateDAccident, updateBody);
  await  updateDAccident.save();
  return updateDAccident;
}

module.exports = {
  createDAccident,
  getDAccidentById,
  getDAccidentByStatus,
  deleteAccidentById,
  updateAccidentById,
  queryDAccident
};

