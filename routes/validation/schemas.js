const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => (validator.isURL(value) ? value : helpers.error('string.uri'));
const validateEmail = (value, helpers) => (validator.isEmail(value) ? value : helpers.error('string.email'));

const validateNewArticleRequest = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.object().keys({
      id: Joi.allow(null),
      name: Joi.string().required()
    }),
    url: Joi.string().custom(validateURL).required(),
    urlToImage: Joi.string().custom(validateURL).required(),
  }),
});

const validateDeleteArticleRequest = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .min(24).max(24).required()
      .hex(),
  }),
});

const validateCreateUserRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).required(),
  }),
});

const validateLoginRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(6).required(),
  }),
});

module.exports = {
  validateNewArticleRequest,
  validateDeleteArticleRequest,
  validateCreateUserRequest,
  validateLoginRequest,
};