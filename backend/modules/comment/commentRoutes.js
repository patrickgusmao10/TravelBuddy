
const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
const { commentValidator } = require('./commentValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post(
  '/destinations/:destinationId/comments',
  isAuthenticated,
  commentValidator,
  asyncHandler(commentController.addComment)
);

router.get(
  '/destinations/:destinationId/comments',
  asyncHandler(commentController.getComments)
);

module.exports = router;