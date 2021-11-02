const httpStatus = require('http-status');
const { AccidentType } = require('../models');
const ApiError = require('../utils/ApiError');


// BUG
/**
 * Create a Accident Type
 * @param {Object} userid
 * @param {Object} accidentTypeBody
 * @returns {Promise<EnforceDocument<T, TMethods>[]>}
 */
const createAccidentType = async (accidentTypeBody,userid ) => {
   const crateAccident = await AccidentType.create(
     accidentTypeBody,
     accidentTypeBody.created_by = userid,
     accidentTypeBody.modified_by = userid
   );
  return crateAccident;
}
// accidentTypeBody
// accidentTypeBody: name, status..
// const FE-name = accidentTypeBody.name
//
/**
 * Query for Accident Type
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAccidentType = async (filter, options) => {
  return await AccidentType.paginate(filter,options);
}

/**
 * Get accident type by status
 * @param {string}  status
 * @returns {Promise<Accident>}
 */
const getAccidentTypeByStatus = async (status) =>{
  return AccidentType.findOne({status});
}

/**
 * Get accident by id
 * @param {ObjectId} id
 * @returns {Promise<Accident>}
 */
const getAccidentTypeById = async (id) =>{
  return AccidentType.findById(id);
};

/**
 * Delete accident type by id
 * @param {ObjectId} accidentTypeId
 * @returns {Promise<AccidentType>}
 */
const deleteAccidentTypeById = async (accidentTypeId) => {
  const accidentType = await getAccidentTypeById(accidentTypeId);
  if(!accidentType){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident type not found');
  }
  await AccidentType.remove();
  return AccidentType;
};

/**
 * update accident type id
 * @param {ObjectId} accidentTypeId
 * @param {ObjectId} userID
 * @param {Object} updateBody
 * @returns {Promise<AccidentType>}
 */
const updateAccidentTypeById = async (accidentTypeId, updateBody, userID) => {
  const accidentType = await getAccidentTypeById(accidentTypeId);
  if (!accidentType) {
    throw new ApiError(httpStatus.NOT_FOUND,'Accident type not found');
  }
  Object.assign(accidentType, updateBody );
  await  accidentType.save();
  return accidentType;
}

module.exports = {
  createAccidentType,
  getAccidentTypeByStatus,
  queryAccidentType,
  updateAccidentTypeById,
  getAccidentTypeById,
  deleteAccidentTypeById
};
