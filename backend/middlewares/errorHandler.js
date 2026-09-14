const { error } = require('./apiResponse');

module.exports = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const errors = err.errors || [];

  return error(
    res,
    err.message || 'Ocorreu um erro inesperado.',
    statusCode,
    errors
  );
};