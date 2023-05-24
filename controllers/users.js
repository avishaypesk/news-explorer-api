const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const AuthorizationError = require('../utils/authorizationerror');
const ConflictError = require('../utils/conflicterror');
const ValidationError = require('../utils/validationerror');
const { UNAUTHORIZED } = require('../utils/errorcodes');
const { JWT_SECRET, NODE_ENV } = process.env;
const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then((user) => {
          res.send({ name, email, _id: user._id });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('User already exists'));
          } else next(err);
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('password')
    .select('name')
    .then((user) => {
      if (!user) {
        next(new ValidationError('User was not found', UNAUTHORIZED));
        return;
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          next(new AuthorizationError('Incorrect credentials provided'));
          return;
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'my_secret', { expiresIn: '7d' });
        res.send({ token, name: user.name });
      });
    })
    .catch(next);
};

module.exports = { createUser, validateUser, getCurrentUser };