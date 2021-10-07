const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const detailsAccidentSchema = new Schema({

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  accident: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'accidents'
  },

  statusLog: {
    type: String,
    enum:['Start','Supporting','End'],
    default: 'Start'
  },

  locationName: {
    type: String
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },

  content:{
    type: String
  },

  timeOut:{
    type: Date
  },

  timeStart:{
    type: Date,
    default: Date.now
  }

});
/**
 * @typedef detailsAccident
 */
detailsAccidentSchema.plugin(toJSON);
detailsAccidentSchema.plugin(paginate);


const DetailsAccident = mongoose.model('DetailsAccident',detailsAccidentSchema);
module.exports = DetailsAccident;
