const express = require('express');

const router = express.Router();

const { isAuthenticated } = require('../../middlewares/auth');
const { optionalAuth } = require('../../middlewares/optionalAuth');
const upload = require('../../middlewares/destinationMulter');
const { uploadValidator } = require('./destinationValidator');
const {
  uploadDestination,
  getDestinationDetails
} = require('./destinationController');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post(
  '/upload',
  isAuthenticated,
  upload.single('image'),
  uploadValidator,
  asyncHandler(uploadDestination)
);

router.get(
  '/:id',
  optionalAuth,
  asyncHandler(getDestinationDetails)
);

module.exports = router;