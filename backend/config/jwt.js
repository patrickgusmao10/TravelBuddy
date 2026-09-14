const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  console.warn(
    '[AVISO] JWT_SECRET não definido no .env. Usando um valor padrão inseguro apenas para desenvolvimento.'
  );
}

function generateToken(payload) {
  return jwt.sign(
    payload,
    JWT_SECRET || 'dev_secret_inseguro',
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function verifyToken(token) {
  return jwt.verify(
    token,
    JWT_SECRET || 'dev_secret_inseguro'
  );
}

module.exports = {
  generateToken,
  verifyToken
};