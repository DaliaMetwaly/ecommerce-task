const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
});

const productType = mongoose.model('productType', productTypeSchema);
module.exports = productType;
