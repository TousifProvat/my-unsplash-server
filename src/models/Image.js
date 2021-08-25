const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: 'string',
      default: 'Just an image',
    },
    imageLink: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);
