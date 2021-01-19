const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const coffeeStuffModel = new mongoose.Schema({
  code: {
    type: String,
  },
  productType: {
    type: ObjectId, ref: 'productType',
  },
  productModel: {
    type: String,
  },
  waterLineCompatible: {
    type: Boolean,
  },
  packSize: {
    type: ObjectId, ref: 'packSize',
  },
  flavor: {
    type: ObjectId, ref: 'flavor',
  },
  stuffType: {
    type: String,
    enum: ['machine', 'pod'],
  },
});

const coffeeStuff = mongoose.model('coffeeStuff', coffeeStuffModel);
module.exports = coffeeStuff;
