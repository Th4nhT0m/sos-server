const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { DetailsAccident } = require('../models');

/**
 * Create a detailsAccident
 * @param {Object} detailsAccidentBody
 * @returns {Promise<DetailsAccident>}
 */
const createDetailsAccident = async (detailsAccidentBody) => {
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
const queryDetailsAccident = async (filter,options) => {
  return await DetailsAccident.paginate(filter,options);
}

//BUG *****
/**
 * GET details details accident
 * @param {ObjectId} id
 * @returns {Promise<DetailsAccident>}
 */
const getDetailsAccidentById = async (id)=>{
  return DetailsAccident.findById(id);
};

/**
 * Get accident by status Log
 * @param {string} statusLog
 * @returns {Promise<DetailsAccident>}
 */
const getDetailsAccidentByStatus = async (statusLog) =>{
  return DetailsAccident.findOne({statusLog});
}

/**
 * Delete details accident by id
 * @param {ObjectId} detailsAccidentId
 * @returns {Promise<DetailsAccident>}
 */
const deleteDetailsAccidentById = async (detailsAccidentId) => {
  const detailsAccident = await getDetailsAccidentById(detailsAccidentId);
  if(!detailsAccident){
    throw new ApiError(httpStatus.NOT_FOUND,'details accident not found');
  }
  await detailsAccident.remove();
  return detailsAccident;
};

/**
 * update accident bu id
 * @param {ObjectId} detailsAccidentId
 * @param {Object} updateBody
 * @returns {Promise<DetailsAccident>}
 */
const updateDetailsAccident = async (detailsAccidentId, updateBody) => {
  const DAUpdate = await getDetailsAccidentById(detailsAccidentId);
  if (!DAUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND,'Details accident not found');
  }
  Object.assign(DAUpdate, updateBody);
  await  DAUpdate.save();
  return DAUpdate;
}

module.exports = {
  createDetailsAccident,
  queryDetailsAccident,
  getDetailsAccidentById,
  deleteDetailsAccidentById,
  updateDetailsAccident,
  getDetailsAccidentByStatus
}
