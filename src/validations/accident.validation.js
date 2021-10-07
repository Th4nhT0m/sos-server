const Joi = require('joi');
const { objectId } = require("./custom.validation");

const createAccident = {
  body: Joi.object().keys({
    nameAccident: Joi.string(),
    status: Joi.string().valid('danger', 'normal'),
    content: Joi.string(),
    locationName: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    people: Joi.number(),
    user: Joi.string().custom(Object),
  }),
};

const createAccidentUrgent = {
  body: Joi.object().keys({
    nameAccident: Joi.string().default('Tai nạn sử dụng thông báo khẩn cấp'),
    status: Joi.string().default('danger'),
    content: Joi.string().default('Cần gấp người trợ giúp'),
    locationName: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    people: Joi.string().default(0),
    user: Joi.string().custom(Object),
  }),
}

const getAccidents = {
  query: Joi.object().keys({
    nameAccident: Joi.string(),
    status: Joi.string().valid('danger', 'normal'),
    locationName: Joi.string(),
    latitude: Joi.string(),
    longitude: Joi.string(),
    user: Joi.string().custom(Object),
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

const updateAccident = {
  params: Joi.object().keys({
      accidentId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
      nameAccident: Joi.string(),
      status: Joi.string().valid('danger', 'normal'),
      content: Joi.string(),
      locationName: Joi.string(),
      people: Joi.number(),
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





