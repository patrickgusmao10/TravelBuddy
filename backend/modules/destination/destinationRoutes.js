const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../../middlewares/auth');
const upload = require('../../middlewares/destinationMulter');
const { validateCreateDestination } = require('./destinationValidator');
const { uploadDestination } = require('./destinationController');

router.post(
  '/upload',
  isAuthenticated,
  upload.single('image'),
  validateCreateDestination,
  uploadDestination
);

module.exports = router;