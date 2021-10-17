const Joi = require('joi');
const { objectId } = require("./custom.validation");

const createAccidentType = {
  body: Joi.object().keys({
    accidentTypeName: Joi.string(),
    status: Joi.string().valid('Low', 'Average' , 'Danger'),
    remark: Joi.string(),
  })
};

const getAccidentsType = {
  query: Joi.object().keys({
    accidentTypeName: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAccidentType = {
  params: Joi.object().keys( {
    accidentTypeId: Joi.string().custom(objectId),
  })
};

const updateAccidentType = {
  params: Joi.object().keys( {
    accidentTypeId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    accidentTypeName: Joi.string(),
    status: Joi.string().valid('Low', 'Average' , 'Danger'),
    remark: Joi.string(),
  })
    .min(1),
}

const deleteAccidentType = {
  params: Joi.object().keys({
    accidentTypeId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createAccidentType,
  getAccidentsType,
  getAccidentType,
  updateAccidentType,
  deleteAccidentType
};


