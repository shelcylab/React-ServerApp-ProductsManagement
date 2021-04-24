const mongoose = require('mongoose');

//schema
const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },

  price: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model('Product', ProductSchema);