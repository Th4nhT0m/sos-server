const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailsAccidentSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  accident: {
    type: Schema.Types.ObjectId,
    ref: 'accidents'
  },
  statusLog: {
    type: String,
    enum:['Start','Supporting','End']
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

})
const DetailsAccident = mongoose.model('detailsAccident',detailsAccidentSchema);
module.exports = DetailsAccident;
