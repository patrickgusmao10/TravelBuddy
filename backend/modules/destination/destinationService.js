const Destination = require('./destinationModel');
const User = require('../user/userModel');

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

module.exports = {
  createDestination,
  getDestinationDetails,
  getFeedDestinations
};