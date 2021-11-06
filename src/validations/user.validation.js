const Joi = require('joi');
const { password, objectId, numberPhone, identityCard } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    identityCard: Joi.string().required().custom(identityCard),
    numberPhone: Joi.string().required().custom(numberPhone),
    address: Joi.string().required(),
    sex: Joi.string().required().valid('Male','Female'),
    dob: Joi.date(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  // params: Joi.object().keys({
  //   userId: Joi.required().custom(objectId),
  // }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      Avatar: Joi.string(),
      identityCard: Joi.string().required(),
      numberPhone: Joi.string().required(),
      address: Joi.string().required(),
   //   sex: Joi.string().required().valid('Male','Female','Other'),
      dob: Joi.date(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
