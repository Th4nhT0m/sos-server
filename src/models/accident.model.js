const mongoose = require('mongoose')
const { object } = require('joi');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const accidentSchema = new Schema({

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  nameAccident: {
    type: String,
  },
  status: {
    type: String,
    enum: ['danger','normal']
  },
  content: {
    type: String
  },
  locationName: {
    type: String
  },

  people: {
    type: Number
  },
  timeStart: {
    type: Date,
    default: Date.now
  }

});
/**
 * @typedef Accident
 */
accidentSchema.plugin(toJSON);
accidentSchema.plugin(paginate);

const Accident = mongoose.model('Accident',accidentSchema);

module.exports = Accident
