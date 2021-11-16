const Joi = require('joi');
const { objectId } = require("./custom.validation")

const createHelper = {
  body: Joi.object().keys({
    accident: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    modified_by: Joi.string().custom(objectId),
    content: Joi.string(),
    timeOut: Joi.date(),
    helperLatitude: Joi.string(),
    helperLongitude: Joi.string(),
    accidentLatitude: Joi.string(),
    accidentLongitude: Joi.string(),
    createTime: Joi.date(),
    UpdateTime:Joi.date(),
  }),
};

const getHelpers = {
  query: Joi.object().keys({
    accident: Joi.string(),
    status: Joi.string().valid('Start','Arrived','Success','Cancel'),
    user: Joi.string(),
    modified_by: Joi.string(),
    timeOut: Joi.date(),
    helperLatitude: Joi.string(),
    helperLongitude: Joi.string(),
    accidentLatitude: Joi.string(),
    accidentLongitude: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHelperByIdAccident = {
  query: Joi.object().keys({
    accident: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const getHelper = {
  params: Joi.object().keys({
    HelperId: Joi.string().custom(objectId),
  }),
};

const updateHelper  = {
  params: Joi.object().keys({
    HelperId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('Start','Arrived','Success','Cancel'),
    content: Joi.string(),
    timeOut: Joi.date(),
    helperLatitude: Joi.string(),
    helperLongitude: Joi.string(),
    accidentLatitude: Joi.string(),
    accidentLongitude: Joi.string(),
    modified_by: Joi.string().custom(objectId),
    UpdateTime:Joi.date(),
  })
    .min(1),
};

const deleteHelper  = {
  params: Joi.object().keys({
    HelperId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createHelper ,
  getHelpers,
  getHelper ,
  updateHelper ,
  deleteHelper,
  getHelperByIdAccident
}

