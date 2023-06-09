const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: 'Invalid URL.',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: 'Invalid URL.',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
