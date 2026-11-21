const { verifyToken } = require('../config/jwt');
const { error: errorResponse } = require('./apiResponse');
const User = require('../modules/user/userModel');

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(
      res,
      'Você precisa estar autenticado para acessar este recurso.',
      401
    );
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = verifyToken(token);
  } catch (err) {
    return errorResponse(
      res,
      'Token inválido ou expirado. Faça login novamente.',
      401
    );
  }

  try {
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username', 'isAdmin', 'isBlocked']
    });

    if (!user) {
      return errorResponse(
        res,
        'Token inválido ou expirado. Faça login novamente.',
        401
      );
    }

    if (user.isBlocked) {
      return errorResponse(
        res,
        'Sua conta foi bloqueada. Entre em contato com a administração.',
        401
      );
    }

    req.user = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return errorResponse(
      res,
      'Acesso restrito a administradores.',
      403
    );
  }

  return next();
};

module.exports = { isAuthenticated, isAdmin };