const Joi = require('joi');
const { objectId } = require("./custom.validation");

const createAccident = {
  body: Joi.object().keys({
    nameAccident: Joi.string(),
    status: Joi.string().valid('danger', 'normal'),
    content: Joi.string(),
    locationName: Joi.string(),
    people: Joi.number(),
  }),
};

const getAccidents = {
  query: Joi.object().keys({
    nameAccident: Joi.string(),
    status: Joi.string().valid('danger', 'normal'),
    locationName: Joi.string(),
    people: Joi.number(),
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

const updateAccidents = {
  params: Joi.object().keys({
      accidentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({  body: Joi.object().keys({
      nameAccident: Joi.string(),
      status: Joi.string().valid('danger', 'normal'),
      content: Joi.string(),
      locationName: Joi.string(),
      people: Joi.number(),
    })
      .min(1),})
}

const deleteAccident = {
  params: Joi.object().keys({
    accidentId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createAccident,
  getAccidents,
  getAccident,
  updateAccidents,
  deleteAccident
};





