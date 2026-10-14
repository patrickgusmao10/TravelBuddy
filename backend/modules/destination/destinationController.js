
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

async function getMyDestinations(req, res) {
  const userId = req.user.id;

  const destinations = await destinationService.getDestinationsByUser(userId);

  return success(res, destinations);
}

async function getDestinationForEdit(req, res) {
  const destinationId = req.params.id;
  const userId = req.user.id;

  const destination = await destinationService.getDestinationForEdit(
    destinationId,
    userId
  );

  return success(res, destination);
}

async function updateDestination(req, res) {
  const destinationId = req.params.id;
  const userId = req.user.id;
  const { title, description } = req.body;
  const newImageFile = req.file || null;

  const updatedDestination = await destinationService.updateDestination(
    destinationId,
    userId,
    title,
    description,
    newImageFile
  );

  return success(res, updatedDestination, 'Destino atualizado com sucesso!');
}

async function deleteDestination(req, res) {
  const destinationId = req.params.id;
  const userId = req.user.id;

  await destinationService.deleteDestination(destinationId, userId, false);

  return success(res, null, 'Destino excluído com sucesso.');
}

module.exports = {
  uploadDestination,
  getDestinationDetails,
  getMyDestinations,
  getDestinationForEdit,
  updateDestination,
  deleteDestination
};