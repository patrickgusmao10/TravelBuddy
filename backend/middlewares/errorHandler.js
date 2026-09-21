const multer = require('multer');
const { error } = require('./apiResponse');

module.exports = (err, req, res, next) => {

  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return error(
        res,
        'A imagem deve ter no máximo 4 MB.',
        400,
        []
      );
    }

    return error(
      res,
      err.message || 'Erro no upload do arquivo.',
      400,
      []
    );
  }

  const statusCode = err.status || 500;
  const errors = err.errors || [];

  return error(
    res,
    err.message || 'Ocorreu um erro inesperado.',
    statusCode,
    errors
  );

};