
const likeService = require('./likeService');
const { success } = require('../../middlewares/apiResponse');

exports.toggleLike = async (req, res) => {
  const destinationId = req.params.destinationId;
  const userId = req.user.id;

  const result = await likeService.toggleLike(userId, destinationId);

  if (result.liked) {
    return success(res, result, 'Destino curtido.', 201);
  }

  return success(res, result, 'Curtida removida.');
};

exports.checkLikeStatus = async (req, res) => {
  const destinationId = req.params.destinationId;
  const userId = req.user.id;

  const liked = await likeService.checkLikeStatus(userId, destinationId);

  return success(res, { liked });
};

exports.getLikedDestinations = async (req, res) => {
  const userId = req.user.id;

  const destinations = await likeService.getLikedDestinations(userId);

  return success(res, destinations);
};