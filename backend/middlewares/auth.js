require('dotenv').config();
const jwt = require('jsonwebtoken');
const { DEV_SECRET } = require('../utils/constants');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { JWT_SECRET, NODE_ENV } = process.env;


const handleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  try {
    if (!token) {
      return handleAuthError(req, res, next);
    }
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return handleAuthError(req, res, next);
  }
};

module.exports = auth;
