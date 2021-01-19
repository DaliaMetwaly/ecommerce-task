const mongoose = require('mongoose');

const packSizeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  qty: {
    type: Number,
  },
});

const packSize = mongoose.model('packSize', packSizeSchema);
module.exports = packSize;
