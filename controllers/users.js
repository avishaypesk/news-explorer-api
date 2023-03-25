const User = require('../models/users');
const Article = require('../models/article');
const NotFoundError = require('../utils/notfounderror');

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(() => next(new NotFoundError('User Id was not found.')))
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find({})
    .orFail(() => new Error('Article list is empty'))
    .then((articles) => res.send(articles))
    .catch(next);
};


const createArticle = (req, res, next) => {
  // const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ ...req.body, owner: req.user._id })
    .orFail(next)
    .then((article) => res.send(article))
    .catch(next);
};


const deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .orFail(() => new NotFoundError('Article not found.'))
    .then((deletedArticle) => res.send(deletedArticle))
    .catch(next);
};

module.exports = {
  getCurrentUser,
  getArticles,
  createArticle,
  deleteArticle
};
