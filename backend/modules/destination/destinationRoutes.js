const express = require('express');

const router = express.Router();

const { isAuthenticated } = require('../../middlewares/auth');
const upload = require('../../middlewares/destinationMulter');
const { uploadValidator } = require('./destinationValidator');
const { uploadDestination } = require('./destinationController');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post(
  '/upload',
  isAuthenticated,
  upload.single('image'),
  uploadValidator,
  asyncHandler(uploadDestination)
);

module.exports = router;