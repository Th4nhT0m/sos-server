const Joi = require('joi');
const { objectId } = require("./custom.validation")

const createDetailsAccident = {
  body: Joi.object().keys({
    accident: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    content: Joi.string(),
    timeOut: Joi.date(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    locationName: Joi.string(),
  }),
};

const getDetailsAccidents = {
  query: Joi.object().keys({
    accident: Joi.string().custom(objectId),
    statusLog: Joi.string().valid('Start','Supporting','End'),
    content: Joi.string(),
    locationName: Joi.string(),
    user: Joi.string().custom(objectId),
    latitude: Joi.string(),
    longitude: Joi.string(),
    timeOut: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDetailsAccident = {
  params: Joi.object().keys({
    detailsAccidentId: Joi.string().custom(objectId),
  }),
};

const updateDetailsAccident = {
  params: Joi.object().keys({
    detailsAccidentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    statusLog: Joi.string().valid('Start','Supporting','End'),
    content: Joi.string(),
    timeOut: Joi.date(),
  })
    .min(1),
};

const deleteDetailsAccident = {
  params: Joi.object().keys({
    detailsAccidentId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createDetailsAccident,
  getDetailsAccidents,
  getDetailsAccident,
  updateDetailsAccident,
  deleteDetailsAccident
}

