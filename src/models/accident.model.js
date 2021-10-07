const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const accidentSchema = new Schema({

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  nameAccident: {
    type: String,
    default: 'Tai nạn'
  },
  status: {
    type: String,
    enum: ['danger','normal']
  },

  content: {
    type: String,
    default: 'Cần được hỗ trợ'
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
