const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

// routes
const imageRoutes = require('./routes/image');

// env vars
dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log(`connected to database`)
);

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1', imageRoutes);

app.get('/', (req, res) => {
  res.status(200).json('Server is working fine!');
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));