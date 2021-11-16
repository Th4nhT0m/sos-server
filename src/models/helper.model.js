const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema
const docker = require('../config/docker')

const helperSchema = new Schema({

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
    enum:['Start', 'Arrived', 'Success', 'Cancel'],
    default: 'Start'
  },

  // start stast
  // arrived  update(nút)
  // success update(nút)
  // Cancel  uupdate (nút)

  helperLatitude: {
    type: String,
  },

  helperLongitude: {
    type: String,
  },

  accidentLatitude: {
    type: String,
  },

  accidentLongitude: {
    type: String,
  },

  /*
  //
    latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },
  //
   */

  content:{
    type: String,
    default: docker.descriptionDetailsAccident
  },

  timeOut:{
    type: Date
  },

  createTime:{
    type: Date,
  },

  UpdateTime:{
    type: Date,
  },

});
/**
 * @typedef detailsAccident
 */
helperSchema.plugin(toJSON);
helperSchema.plugin(paginate);


const Helper = mongoose.model('Helper',helperSchema);
module.exports = Helper;
