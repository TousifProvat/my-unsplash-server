const Image = require('../models/Image');

exports.getAllImages = async (req, res) => {
  try {
    const Images = await Image.find({});
    return res.status(200).json({
      Images,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generatePublicUrl = (name) => {
  return `${process.env.SERVER_LINK}/public/${name}`;
};

exports.uploadImage = async (req, res) => {
  const { title } = req.body;

  try {
    if (req.file != '') {
      const { originalname } = req.file;

      const newImage = new Image({
        title: title != '' ? title : 'just an image',
        imageLink: generatePublicUrl(originalname),
      });

      const image = await newImage.save();

      res.status(201).json({ image });
    } else {
      return res.status(400).json({ message: 'Image is missing!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  const { imageId } = req.body;
  try {
    const image = await Image.findById({ _id: imageId });
    if (!image) {
      return res.status(204).json({ message: 'No such content found' });
    }

    const deletedImage = await Image.findByIdAndDelete({ _id: imageId });

    return res.status(202).json({
      message: 'Deleted',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
