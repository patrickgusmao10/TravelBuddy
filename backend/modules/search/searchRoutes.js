const express = require('express');
const router = express.Router();
const searchController = require('./searchController');
const asyncHandler = require('../../middlewares/asyncHandler');

router.get('/search', asyncHandler(searchController.search));

module.exports = router;