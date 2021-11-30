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

  //FE
  // số người giúp:  0.

  // giao dien list
  // (BE) staus: start
  // (FE) Số người giúp:  2(getAll DA).

  //nút : update thành công

  // huỷ

  // BE
  // đang cần hỗ trợ  create.
  // thành công       update(nút).
  // huỷ.             update(nút).

  status:{
    type: String,
    enum:['Waiting','Success','Cancel'],
    default: 'Waiting'
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },

  createTime:{
    type: Date,
  },

  UpdateTime:{
    type: Date,
  },

});
/**
 * @typedef Accident
 */
accidentSchema.plugin(toJSON);
accidentSchema.plugin(paginate);

const Accident = mongoose.model('Accident',accidentSchema);
module.exports = Accident
