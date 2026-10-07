const { verifyToken } = require('../config/jwt');

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      req.user = verifyToken(token);
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  return next();
};

module.exports = { optionalAuth };