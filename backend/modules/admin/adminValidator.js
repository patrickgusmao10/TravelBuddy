const { body, query, validationResult } = require('express-validator');
const { ADMIN } = require('../../config/constants');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const firstError = errors.array()[0].msg;
  const error = new Error(firstError);
  error.status = 400;
  error.errors = errors.array();
  throw error;
};

exports.reportsFilterValidator = [
  query('status')
    .optional()
    .isIn(ADMIN.REPORT_FILTERS)
    .withMessage(`O filtro de status deve ser um destes: ${ADMIN.REPORT_FILTERS.join(', ')}.`),
  validate
];

exports.blockUserValidator = [
  body('isBlocked')
    .exists()
    .withMessage('O campo isBlocked é obrigatório.')
    .bail()
    .isBoolean({ strict: true })
    .withMessage('O campo isBlocked deve ser verdadeiro ou falso.'),
  validate
];