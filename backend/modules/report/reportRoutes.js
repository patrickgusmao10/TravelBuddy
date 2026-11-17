const express = require('express');
const router = express.Router();
const reportController = require('./reportController');
const { reportValidator } = require('./reportValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/destinations/:destinationId/report', isAuthenticated, reportValidator, asyncHandler(reportController.reportDestination));

module.exports = router;