const Image = require('../models/Image');

exports.getAllImages = async (req, res) => {
  try {
    const Images = await Image.find();
    if (Images.length > 0) {
      return res.status(200).json({
        Images,
      });
    } else {
      return res.status(200).json({ message: 'There is no image' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  const { title, link } = req.body;
  try {
    const newImage = new Image({
      title: title,
      imageLink: link,
    });

    const image = await newImage.save();

    res.status(201).json({ image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
