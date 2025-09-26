const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    enum: ['veg', 'non-veg']   // 👈 split into individual enum values
  },
  region: {
    type: [String],
    enum: ['south-indian', 'north-indian', 'bakery', 'chinese']  // 👈 each value separately
  },
  offer: {
    type: String
  },
  image: {
    type: String
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    }
  ],
  products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }]
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
