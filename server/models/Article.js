const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isPay: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
