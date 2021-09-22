const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accidentSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref:'User'
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
    type: Number,
  },
  timeStart: {
    type: Date,
    default: Date.now
  }

})
const accident = mongoose.model('accident',accidentSchema);

module.exports = accident
