const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const docker = require('../config/docker');
const Schema = mongoose.Schema

const handbookSchema = new Schema({

  nameHandbook: {
    type: String,
  },

  severity: {
    type: String,
    enum: ['Serious','Medium','Simple']
  },

  icon: String,

  content: {
    type: String,
    default: docker.descriptionContentHB
  },

  utensil: {
    type: String,
  },

  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  modified_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },


},{
  timestamps: true,
});
/**
 * @typedef handbook
 */
handbookSchema.plugin(toJSON);
handbookSchema.plugin(paginate);

const Handbook = mongoose.model('Handbook', handbookSchema);
module.exports = Handbook


