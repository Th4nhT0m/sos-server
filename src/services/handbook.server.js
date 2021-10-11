const httpStatus = require('http-status');
const { Handbook, Accident } = require('../models');
const ApiError = require('../utils/ApiError')

/**
 * Create a handbook
 * @param {Object} handbookBody
 * @returns {Promise<Handbook>}
 */
const createHandbook = async (handbookBody) => {
  return Handbook.create(handbookBody);
}

/**
 * Query for handbook
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHandbook = async (filter, options) => {
  return await Handbook.paginate(filter,options);
}

/**
 * Get handbook by id
 * @param {ObjectId} id
 * @returns {Promise<>}
 */
const getHandbookById = async (id) =>{
  return Handbook.findById(id);
};

/**
 * Get Handbook by severity
 * @param {string}  severity
 * @returns {Promise<Handbook>}
 */
const getHandbookBySeverity = async (severity) =>{
  return Handbook.findOne({severity});
}

/**
 * Delete Handbook by id
 * @param {ObjectId} handbookId
 * @returns {Promise<Handbook>}
 */
const deleteHandbookById = async (handbookId) => {
  const deleteHB = await getHandbookById(handbookId);
  if(!deleteHB){
    throw new ApiError(httpStatus.NOT_FOUND,'Handbook not found');
  }
  await deleteHB.remove();
  return deleteHB;
};

/**
 * update Handbook bu id
 * @param {ObjectId} handbookId
 * @param {Object} updateBody
 * @returns {Promise<Handbook>}
 */
const updateHandbookById = async (handbookId, updateBody) => {
  const updateHB = await getHandbookById(handbookId);
  if (!updateHB) {
    throw new ApiError(httpStatus.NOT_FOUND,'handbook not found');
  }
  Object.assign(updateHB, updateBody);
  await  updateHB.save();
  return updateHB;
}

module.exports = {
  createHandbook,
  queryHandbook,
  getHandbookById,
  getHandbookBySeverity,
  deleteHandbookById,
  updateHandbookById,
}
