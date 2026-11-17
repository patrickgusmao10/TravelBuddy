const sequelize = require('../../config/database');
const Comment = require('./commentModel');
const Destination = require('../destination/destinationModel');
const User = require('../user/userModel');
const { createNotification } = require('../notification/notificationService');
const { NOTIFICATION } = require('../../config/constants');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findDestinationOrFail(destinationId) {
  const destination = await Destination.findByPk(destinationId);

  if (!destination) {
    const error = new Error('Destino não encontrado.');
    error.status = 404;
    throw error;
  }

  return destination;
}

async function addComment(userId, destinationId, content) {
  const destination = await findDestinationOrFail(destinationId);

  const comment = await sequelize.transaction(async (t) => {
    const created = await Comment.create(
      { userId, destinationId: destination.id, content },
      { transaction: t }
    );

    await destination.increment('commentsCount', { transaction: t });

    await createNotification({
      userId: destination.userId,
      actorId: userId,
      type: NOTIFICATION.TYPES.COMMENT,
      destinationId: destination.id
    }, t);

    return created;
  });

  return await Comment.findByPk(comment.id, {
    include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
  });
}

async function getCommentsByDestinationId(destinationId) {
  const destination = await findDestinationOrFail(destinationId);

  return await Comment.findAll({
    where: { destinationId: destination.id },
    include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
    order: [['createdAt', 'DESC'], ['id', 'DESC']]
  });
}

module.exports = { addComment, getCommentsByDestinationId };