const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const flavor = mongoose.model('flavor', flavorSchema);
module.exports = flavor;
