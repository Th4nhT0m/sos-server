const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const accidentTypeSchema = new Schema( {
  accidentTypeName: {
    type: String,
    required: true,
    trim: true,
  },


  status: {
    type: String,
    enum: ['Low', 'Average' , 'Danger']
  },

  remark: {
    type: String,
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
