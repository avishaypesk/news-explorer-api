const bcrypt = require('bcryptjs');
const jwtauth = require('../middlewares/jwtauth');
const User = require('../models/user');
const ValidationError = require('../utils/validationerror');
const AuthorizationError = require('../utils/authorizationerror');
const ConflictError = require('../utils/conflicterror');
const { JWT_SECRET, NODE_ENV } = process.env;

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, name, password: hash })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('User already exists.'));
        } else next(err);
      });
  });
};

const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('password')
    .orFail(() => new ValidationError('User was not found.'))
    .then((user) => {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          throw new AuthorizationError('Incorrect credentials provided.');
        }
        const token = jwtauth.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  validateUser
};
