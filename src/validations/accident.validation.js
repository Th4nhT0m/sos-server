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
    createTime:Joi.date(),
    UpdateTime:Joi.date(),
  }),
};

const createAccidentUrgent = {
  body: Joi.object().keys({
    nameAccident: Joi.string().default(docker.descriptionNameAU),
    accidentType: Joi.string().custom(Object),
    description: Joi.string().default(docker.descriptionContentAU),
    latitude: Joi.string(),
    longitude: Joi.string(),
    created_by: Joi.string().custom(Object),
    modified_by: Joi.string().custom(Object),
    createTime:Joi.date(),
    UpdateTime:Joi.date(),
  }),
}

const getAccidents = {
  query: Joi.object().keys({
    nameAccident: Joi.string(),
    accidentType: Joi.string(),
    created_by: Joi.string(),
    modified_by: Joi.string(),
    status: Joi.string().valid('Waiting','Success','Cancel'),
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
      UpdateTime:Joi.date(),
      modified_by: Joi.string().custom(Object),
      status: Joi.string().valid('Waiting','Success','Cancel'),
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
