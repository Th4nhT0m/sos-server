const Joi = require('joi');
const { objectId } = require("./custom.validation");

const createAccidentType = {
  body: Joi.object().keys({
    accidentTypeName: Joi.string(),
    remark: Joi.string(),
    created_by: Joi.string().custom(objectId),
    modified_by: Joi.string().custom(objectId),
  }),
};


const getAccidentsType = {
  query: Joi.object().keys({
    accidentTypeName: Joi.string(),
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
    remark: Joi.string(),
    modified_by: Joi.string().custom(objectId),
  })
    .min(1),
};

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


