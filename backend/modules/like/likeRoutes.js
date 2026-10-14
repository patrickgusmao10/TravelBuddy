
const express = require('express');
const router = express.Router();
const likeController = require('./likeController');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post(
  '/destinations/:destinationId/toggle-like',
  isAuthenticated,
  asyncHandler(likeController.toggleLike)
);

router.get(
  '/destinations/:destinationId/like-status',
  isAuthenticated,
  asyncHandler(likeController.checkLikeStatus)
);

router.get(
  '/liked-destinations',
  isAuthenticated,
  asyncHandler(likeController.getLikedDestinations)
);

module.exports = router;