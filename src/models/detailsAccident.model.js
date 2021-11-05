const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema
const docker = require('../config/docker')

const detailsAccidentSchema = new Schema({

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  modified_by:{
    type: mongoose.SchemaTypes.ObjectId,
  },

  accident: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'accidents'
  },

  status: {
    type: String,
    enum:['Start','Supporting','End'],
    default: 'Start'
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },

  content:{
    type: String,
    default: docker.descriptionDetailsAccident
  },

  timeOut:{
    type: Date
  },

},{
  timestamps: true,
});
/**
 * @typedef detailsAccident
 */
detailsAccidentSchema.plugin(toJSON);
detailsAccidentSchema.plugin(paginate);


const DetailsAccident = mongoose.model('DetailsAccident',detailsAccidentSchema);
module.exports = DetailsAccident;
