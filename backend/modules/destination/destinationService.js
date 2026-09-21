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

module.exports = {
  createDestination
};