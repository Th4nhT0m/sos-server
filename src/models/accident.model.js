const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema
const docker = require('../config/docker')

const accidentSchema = new Schema({

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  nameAccident: {
    type: String,
    default: docker.descriptionNameAccident
  },
  status: {
    type: String,
    enum: ['Danger','Normal']
  },

  content: {
    type: String,
    default: docker.descriptionContentAccident
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

  people: {
    type: Number,
    default: 1,
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
