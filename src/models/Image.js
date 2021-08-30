const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Just an image',
    },
    public_id: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);
