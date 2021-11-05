const Joi = require('joi');
const { objectId } = require("./custom.validation");

const createHandbook = {
  body: Joi.object().keys({
    nameHandbook: Joi.string(),
    severity: Joi.string().valid('Serious','Medium','Simple'),
    icon: Joi.string(),
    content: Joi.string(),
    utensil: Joi.string(),
    created_by: Joi.string().custom(Object),
    modified_by: Joi.string().custom(Object),
  }),
};

const getHandbooks = {
  query: Joi.object().keys({
    nameHandbook: Joi.string(),
    severity: Joi.string().valid('Serious','Medium','Simple'),
    icon: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  })
};

const getHandbook = {
  params: Joi.object().keys({
    handbookId: Joi.string().custom(objectId),
  })
};

const updateHandbook = {
  params: Joi.object().keys({
    handbookId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    nameHandbook: Joi.string(),
    severity: Joi.string().valid('Serious','Medium','Simple'),
    icon: Joi.string(),
    content: Joi.string(),
    utensil: Joi.string(),
    modified_by: Joi.string().custom(Object),
  })
    .min(1),
};

const deleteHandbook = {
  params: Joi.object().keys({
    handbookId: Joi.required().custom(objectId),
  })
}
module.exports = {
  createHandbook,
  getHandbooks,
  getHandbook,
  updateHandbook,
  deleteHandbook
};




