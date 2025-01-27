const mongoose = require('mongoose');

const { Schema } = mongoose;

const detailSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
});


module.exports = detailSchema;
