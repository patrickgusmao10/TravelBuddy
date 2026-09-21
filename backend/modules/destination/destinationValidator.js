const { VALIDATION } = require('../../config/constants');

function validateCreateDestination(req, res, next) {
  const { title, description } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Título é obrigatório'
    });
  }

  if (title.length > VALIDATION.TITLE_MAX) {
    return res.status(400).json({
      success: false,
      message: `Título deve ter no máximo ${VALIDATION.TITLE_MAX} caracteres`
    });
  }

  if (description && description.length > VALIDATION.DESCRIPTION_MAX) {
    return res.status(400).json({
      success: false,
      message: `Descrição deve ter no máximo ${VALIDATION.DESCRIPTION_MAX} caracteres`
    });
  }

  next();
}

module.exports = {
  validateCreateDestination
};