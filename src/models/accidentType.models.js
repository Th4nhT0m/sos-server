const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const accidentTypeSchema = new Schema( {

  accidentTypeName: {
    type: String,
    required: true,
  },

  remark: {
    type: String,
  },

  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

  modified_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },

},{
  timestamps: true,
});

/**
 * @typedef accidentType
 */
accidentTypeSchema.plugin(toJSON);
accidentTypeSchema.plugin(paginate);

const AccidentType = mongoose.model('AccidentType', accidentTypeSchema);
module.exports = AccidentType
