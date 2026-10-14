
const sequelize = require('../../config/database');
const Like = require('./likeModel');
const Destination = require('../destination/destinationModel');
const User = require('../user/userModel');

async function toggleLike(userId, destinationId) {
  const destination = await Destination.findByPk(destinationId);

  if (!destination) {
    const error = new Error('Destino não encontrado.');
    error.status = 404;
    throw error;
  }

  const liked = await sequelize.transaction(async (t) => {
    const [like, created] = await Like.findOrCreate({
      where: { userId, destinationId: destination.id },
      defaults: { userId, destinationId: destination.id },
      transaction: t
    });

    if (created) {
      await destination.increment('likesCount', { transaction: t });
      return true;
    }

    await like.destroy({ transaction: t });
    await destination.decrement('likesCount', { transaction: t });
    return false;
  });

  await destination.reload();

  return { liked, likesCount: destination.likesCount };
}

async function checkLikeStatus(userId, destinationId) {
  const like = await Like.findOne({
    where: { userId, destinationId }
  });

  return !!like;
}

async function getLikedDestinations(userId) {
  const likes = await Like.findAll({
    where: { userId },
    include: [{
      model: Destination,
      include: [{
        model: User,
        attributes: ['id', 'username', 'fullName', 'profilePicture']
      }]
    }],
    order: [['createdAt', 'DESC']]
  });

  return likes.map((like) => like.Destination);
}

module.exports = {
  toggleLike,
  checkLikeStatus,
  getLikedDestinations
};