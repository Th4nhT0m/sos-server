const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema
const docker = require('../config/docker')

const accidentSchema = new Schema({

  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  nameAccident: {
    type: String,
    default: docker.descriptionNameAccident
  },

  modified_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  accidentType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'AccidentType'
  },

  description: {
    type: String,
    default: docker.descriptionContentAccident
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },

},{
  timestamps: true,
});
/**
 * @typedef Accident
 */
accidentSchema.plugin(toJSON);
accidentSchema.plugin(paginate);

const Accident = mongoose.model('Accident',accidentSchema);
module.exports = Accident
