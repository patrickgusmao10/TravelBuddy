const express = require('express');
const router = express.Router();
const adminController = require('./adminController');
const { reportsFilterValidator, blockUserValidator } = require('./adminValidator');
const { isAuthenticated, isAdmin } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.use('/admin', isAuthenticated, isAdmin);

router.get('/admin/dashboard', asyncHandler(adminController.getDashboard));

router.get('/admin/reports', reportsFilterValidator, asyncHandler(adminController.getReports));

router.patch('/admin/reports/:id/review', asyncHandler(adminController.reviewReport));

router.get('/admin/users', asyncHandler(adminController.getUsers));

router.patch('/admin/users/:id/block', blockUserValidator, asyncHandler(adminController.setUserBlocked));

router.get('/admin/destinations', asyncHandler(adminController.getDestinations));

router.delete('/admin/destinations/:id', asyncHandler(adminController.deleteDestination));

module.exports = router;