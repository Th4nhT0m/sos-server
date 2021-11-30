const httpStatus = require('http-status');
const { Helper, Accident } = require('../models');
const ApiError = require('../utils/ApiError');
const { filter } = require('compression');
const Joi = require('joi');

/**
 * Create a Helper
 * @param {Object} userId
 * @param {Object} HelperBody
 * @returns {Promise<Helper>}
 */
const createHelper = async (HelperBody,userId) => {
  // let HelperBodyCre;
  // console.log(HelperBody.accident);
  // const ac = Accident.findById(HelperBody.accident);
  // console.log();
  // console.log(userId);
  // id user accident - id
  // if(HelperBody.accident.created_by === userId) {
    const HelperBodyCre = Helper.create({
      accident: HelperBody.accident,
      user: userId,
      modified_by: userId,
      content: HelperBody.content,
      timeOut: HelperBody.timeOut,
      helperLatitude: HelperBody.helperLatitude,
      helperLongitude: HelperBody.helperLongitude,
      accidentLatitude: HelperBody.accidentLatitude,
      accidentLongitude: HelperBody.accidentLongitude,
      createTime: Date.now(),
      UpdateTime: Date.now(),
    });
  return HelperBodyCre;
};

/**
 * Query for Helper
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHelper = async (filter, options) => {
  return await Helper.paginate(filter,options);
}

/**
 * Query for Helper
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHelperByAccidentId = async (filter, options) => {
  return Helper.paginate(filter,options);
}

/**
 * Get Helper by id
 * @param {ObjectId} id
 * @returns {Promise<Accident>}
 */
const getHelperById = async (id) =>{
  return Helper.findById(id);
};

/**
 * Query for Helper
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getHelperByUserId = async (filter,options) =>{
  let result = await Helper.paginate({user:filter},options);
  return result;
}

/**
 * Get Helper by statusLog
 * @param {string}  status
 * @returns {Promise<Helper>}
 */
const getHelperByStatus = async (status) =>{
  return Helper.findOne({status});
}

/**
 * Delete Helper by id
 * @param {ObjectId} HelperId
 * @returns {Promise<Helper>}
 */
const deleteHelperById = async (HelperId) => {
  const deleteHelper= await getHelperById(HelperId);
  if(!deleteHelper){
    throw new ApiError(httpStatus.NOT_FOUND,'Helper not found');
  }
  await deleteHelper.remove();
  return deleteHelper;
};

/**
 * update Helper id
 * @param {ObjectId} userId
 * @param {ObjectId} HelperId
 * @param {Object} updateBody
 * @returns {Promise<Helper>}
 */
const updateHelperById = async (HelperId, updateBody,userId) => {
  const updateHelper = await getHelperById(HelperId);
  if (!updateHelper) {
    throw new ApiError(httpStatus.NOT_FOUND,'Helper details not found');
  }
  Object.assign(updateHelper, {
    status: updateBody.status,
    modified_by: userId,
    content: updateBody.content,
    timeOut: updateBody.timeOut,
    helperLatitude: updateBody.helperLatitude,
    helperLongitude: updateBody.helperLongitude,
    accidentLatitude: updateBody.accidentLatitude,
    accidentLongitude: updateBody.accidentLongitude,
    UpdateTime: Date.now(),
  });
  await  updateHelper.save();
  return updateHelper;
}

module.exports = {
  createHelper,
  queryHelper,
  getHelperById,
  getHelperByStatus,
  deleteHelperById,
  updateHelperById,
  getHelperByUserId,
  queryHelperByAccidentId,
};

