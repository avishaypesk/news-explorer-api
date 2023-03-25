const router = require('express').Router();
const auth = require('../middleware/auth');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  deleteArticle,
  createArticle,
  getArticles,
  getCurrentUser,
} = require('../controllers/users');

const { createUser, validateUser } = require('../controllers/auth');

const validateURL = (value, helpers) => (validator.isURL(value) ? value : helpers.error('string.uri'));
const validateEmail = (value, helpers) => (validator.isEmail(value) ? value : helpers.error('string.uri'));

const validateNewArticleRequest = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validateURL).required(),
    image: Joi.string().custom(validateURL).required(),
  }),
});

const validateDeleteArticleRequest = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().min(24).max(24).required(),
  }),
});

const validateSignupRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).required(),
  }),
});

const validateSigninRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(6).required(),
  }),
});

router.get('/users/me', auth, getCurrentUser);

router.get('/articles', auth, getArticles);

router.post('/articles', auth, validateNewArticleRequest, createArticle);

router.delete('/articles/:articleId', auth, validateDeleteArticleRequest, deleteArticle);

router.post('/signup',validateSignupRequest, createUser);

router.post('/signin',validateSigninRequest, validateUser);

module.exports = router;
