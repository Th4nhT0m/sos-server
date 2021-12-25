const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const async = require('async');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isNumberPhoneTaken(userBody.numberPhone)){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Number phone already taken');
  }
  if(await  User.isIdentityCardTaken(userBody.identityCard)){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Identity card already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  return await User.paginate(filter, options);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const findUser = User.findById(id);
  return findUser;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by isEmailVerified
 * @param {string} email
 * @returns {Promise<User>}
 */
const getEmailVerified = async (email) => {
  const user = User.findOne({ email });
  if( user.isEmailVerified === false){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email');
  }
  return user.isEmailVerified;
};

/**
 * Update user by id
 * @param userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update rank user by id
 * @param userId
 * @param {Object} updateRank
 * @returns {Promise<User>}
 */
const updateRankUser = async (userId, updateRank) => {
  const rank = await getUserById(userId);
  if (!rank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const resultCountHelps = rank.countedHelps + 1;
  const resultRanking = (rank.countedHelps * rank.ranking + updateRank.ranking)/(rank.countedHelps + 1) ;
  Object.assign(rank, {
    ranking: resultRanking,
    countedHelps: resultCountHelps,
  });
  await rank.save();
  return rank;
}

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getEmailVerified,
  updateRankUser
};
