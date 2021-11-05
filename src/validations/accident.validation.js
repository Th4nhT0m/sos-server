const Joi = require('joi');
const { objectId } = require("./custom.validation");
const docker = require("../config/docker");
//const auth = require("../middlewares/auth");

const createAccident = {
  body: Joi.object().keys({
    nameAccident: Joi.string(),
    accidentType: Joi.string().custom(Object),
    description: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    created_by: Joi.string().custom(Object),
    modified_by: Joi.string().custom(Object),
  }),
};

const createAccidentUrgent = {
  body: Joi.object().keys({
    nameAccident: Joi.string().default(docker.descriptionNameAU),
    accidentType: Joi.string().default("617d7aa311d8ae3034be3309"),
    description: Joi.string().default(docker.descriptionContentAU),
    latitude: Joi.string(),
    longitude: Joi.string(),
    created_by: Joi.string().custom(Object),
    modified_by: Joi.string().custom(Object),
  }),
}

const getAccidents = {
  query: Joi.object().keys({
    nameAccident: Joi.string(),
    accidentType: Joi.string(),
    created_by: Joi.string(),
    modified_by: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAccident = {
  params: Joi.object().keys( {
    accidentId: Joi.string().custom(objectId),
  })
};

const updateAccident = {
  params: Joi.object().keys({
      accidentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
      nameAccident: Joi.string(),
      accidentType: Joi.string().custom(Object),
      description: Joi.string(),
      latitude: Joi.string(),
      longitude: Joi.string(),
      modified_by: Joi.string().custom(Object),
  })
      .min(1),
};

const deleteAccident = {
  params: Joi.object().keys({
    accidentId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createAccident,
  getAccidents,
  getAccident,
  createAccidentUrgent,
  updateAccident,
  deleteAccident
};
