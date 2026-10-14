
const Destination = require('./destinationModel');
const User = require('../user/userModel');
const fs = require('fs');
const path = require('path');

async function createDestination({ title, description, imagePath, userId }) {
  const destination = await Destination.create({
    title,
    description,
    imagePath,
    userId
  });

  await User.increment('destinationsCount', {
    where: { id: userId }
  });

  return destination;
}

async function getDestinationDetails(destinationId, currentUserId = null) {
  const destination = await Destination.findByPk(destinationId, {
    include: [{
      model: User,
      attributes: ['id', 'username', 'fullName', 'profilePicture']
    }]
  });

  if (!destination) {
    const error = new Error('Destino não encontrado.');
    error.status = 404;
    throw error;
  }

  await destination.increment('views');

  await destination.reload();

  return destination;
}

async function getFeedDestinations(page = 1, limit = 12) {
  const offset = (page - 1) * limit;

  const destinations = await Destination.findAll({
    include: [{
      model: User,
      attributes: ['id', 'username', 'fullName', 'profilePicture']
    }],
    order: [['createdAt', 'DESC']],
    offset,
    limit
  });

  return destinations;
}

async function getDestinationsByUser(userId) {
  return await Destination.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });
}

async function getDestinationForEdit(destinationId, userId) {
  const destination = await Destination.findByPk(destinationId);

  if (!destination) {
    const error = new Error('Destino não encontrado.');
    error.status = 404;
    throw error;
  }

  if (destination.userId !== userId) {
    const error = new Error('Você não tem permissão para editar este destino.');
    error.status = 403;
    throw error;
  }

  return destination;
}

async function updateDestination(destinationId, userId, title, description, newImageFile) {
  const destination = await getDestinationForEdit(destinationId, userId);

  const oldImageFilename = newImageFile ? destination.imagePath : null;

  destination.title = title;
  destination.description = description;

  if (newImageFile) {
    destination.imagePath = newImageFile.filename;
  }

  await destination.save();

  if (oldImageFilename) {
    const oldImagePath = path.join(
      __dirname,
      '../../public/uploads/destinations',
      oldImageFilename
    );

    fs.unlink(oldImagePath, (err) => {
      if (err) console.error('Erro ao apagar imagem antiga:', err);
    });
  }

  return destination;
}

async function deleteDestination(destinationId, requestingUserId, isAdmin = false) {
  const destination = await Destination.findByPk(destinationId);

  if (!destination) {
    const error = new Error('Destino não encontrado.');
    error.status = 404;
    throw error;
  }

  if (!isAdmin && destination.userId !== requestingUserId) {
    const error = new Error('Você não tem permissão para excluir este destino.');
    error.status = 403;
    throw error;
  }

  await destination.destroy();

  await User.decrement('destinationsCount', {
    where: { id: destination.userId }
  });

  const imageFilePath = path.join(
    __dirname,
    '../../public/uploads/destinations',
    destination.imagePath
  );

  fs.unlink(imageFilePath, (err) => {
    if (err) console.error('Erro ao apagar imagem do destino excluído:', err);
  });
}

module.exports = {
  createDestination,
  getDestinationDetails,
  getFeedDestinations,
  getDestinationsByUser,
  getDestinationForEdit,
  updateDestination,
  deleteDestination
};