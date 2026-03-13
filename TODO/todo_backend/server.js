const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const TodoModel = require('./models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is required');
  process.exit(1);
}

app.use(express.static(path.join(__dirname, 'static/build')));

app.post('/add', (req, res) => {
  const { task } = req.body;

  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TodoModel.findByIdAndUpdate(id, { task }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/build', 'index.html'));
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;