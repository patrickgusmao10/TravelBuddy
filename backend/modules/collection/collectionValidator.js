const { body, validationResult } = require('express-validator');
const { VALIDATION } = require('../../config/constants');

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

exports.createCollectionValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('O título da coleção é obrigatório.')
        .isLength({
            min: VALIDATION.COLLECTION_TITLE_MIN,
            max: VALIDATION.COLLECTION_TITLE_MAX
        })
        .withMessage(
            `O título da coleção deve ter entre ${VALIDATION.COLLECTION_TITLE_MIN} e ${VALIDATION.COLLECTION_TITLE_MAX} caracteres.`
        ),

    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: VALIDATION.COLLECTION_DESCRIPTION_MAX })
        .withMessage(
            `A descrição deve ter no máximo ${VALIDATION.COLLECTION_DESCRIPTION_MAX} caracteres.`
        ),

    body('isPublic')
        .optional()
        .isBoolean({ strict: true })
        .withMessage('O campo isPublic deve ser verdadeiro ou falso.'),

    validate
];