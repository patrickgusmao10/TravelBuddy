
const fs = require('fs');
const multer = require('multer');
const { error } = require('./apiResponse');

// Remove arquivos enviados pelo Multer quando a requisição falha.
function removeUploadedFiles(req) {
  const uploadedFiles = [];

  // .single() popula req.file
  if (req.file) {
    uploadedFiles.push(req.file);
  }

  // .fields() popula req.files como um objeto de arrays
  if (req.files) {
    uploadedFiles.push(...Object.values(req.files).flat());
  }

  uploadedFiles.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Erro ao limpar arquivo órfão:', err);
      }
    });
  });
}

module.exports = (err, req, res, next) => {

  console.error(err);

  // Limpa arquivos gravados pelo Multer antes da falha.
  removeUploadedFiles(req);

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