const destinationService = require('./destinationService');
const { success } = require('../../middlewares/apiResponse');

async function uploadDestination(req, res) {
  if (!req.file) {
    const error = new Error('Imagem é obrigatória');
    error.status = 400;
    throw error;
  }

  const { title, description } = req.body;
  const userId = req.user.id;

  const imagePath = req.file.filename;

  const destination = await destinationService.createDestination({
    title,
    description,
    imagePath,
    userId
  });

  return success(
    res,
    destination,
    'Destino criado com sucesso',
    201
  );
}

async function getDestinationDetails(req, res) {
  const destinationId = req.params.id;
  const currentUserId = req.user ? req.user.id : null;

  const destination = await destinationService.getDestinationDetails(
    destinationId,
    currentUserId
  );

  const isOwner = currentUserId === destination.userId;

  return success(res, { ...destination.toJSON(), isOwner });
}

module.exports = {
  uploadDestination,
  getDestinationDetails
};