const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const commandRoute = require('./routes/command');

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

// const db = mongoose.connection;

app.use('/api/commands', commandRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend listening on port ${process.env.PORT || 8000}`);
});
