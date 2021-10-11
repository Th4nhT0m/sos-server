const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema

const handbookSchema = new Schema({

  nameHandbook: {
    type: String,
  },

  severity: {
    type: String,
    enum: ['Serious','Medium','Simple']
  },

  icon: String,

  content: {
    type: String,
    default: "Sẽ cập nhật sau"
  },

  utensil: {
    type: String,
  }

},{
  timestamps: true,
});
/**
 * @typedef
 */
handbookSchema.plugin(toJSON);
handbookSchema.plugin(paginate);

const Handbook = mongoose.model('Handbook', handbookSchema);
module.exports = Handbook


