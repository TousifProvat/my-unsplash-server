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

exports.uploadImage = async (req, res) => {
  const { title } = req.body;
  
  try {
    if(req.file != ''){
      const {originalname} = req.file;

      const newImage = new Image({
        title: title,
        imageLink: `http://localhost:5000/public/${originalname.trim()}`,
      });
  
      const image = await newImage.save();
  
      res.status(201).json({ image });
    }else{
      return res.status(400).json({ message: 'Image is missing!'})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
