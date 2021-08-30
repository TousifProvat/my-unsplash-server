const Image = require('../models/Image');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllImages = async (req, res) => {
  try {
    const Images = await Image.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      Images,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const imageTypeValidator = (imgType) => {
  const accepetedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return accepetedTypes.includes(imgType);
};

exports.uploadImage = async (req, res) => {
  const { title } = req.body;

  try {
    if (req.file != '') {
      const { originalname, mimetype, path } = req.file;

      if (!imageTypeValidator(mimetype)) {
        return res.status(404).json({ message: 'Wrong file type' });
      }

      const uploadedResponse = await cloudinary.uploader.upload(path);

      if (Object.keys(uploadedResponse).length < 1) {
        return res
          .status(400)
          .json({ message: 'Something went wrong! Please try again later' });
      }

      const newImage = new Image({
        title: title != '' ? title : 'just an image',
        public_id: uploadedResponse.public_id,
        signature: uploadedResponse.signature,
        imageLink: uploadedResponse.secure_url,
      });

      const image = await newImage.save();

      res.status(201).json({ image });
    } else {
      return res.status(400).json({ message: 'Image is missing!' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteImage = async (req, res) => {
  const { imageId } = req.body;
  try {
    const image = await Image.findById({ _id: imageId });
    if (!image) {
      return res.status(204).json({ message: 'No such content found' });
    }

    cloudinary.uploader.destroy(`${image.public_id}`);

    const deletedImage = await Image.findByIdAndDelete({ _id: imageId });
    return res.status(202).json({
      message: 'Deleted',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
