const express = require('express');
const router = express.Router();
const notificationController = require('./notificationController');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.get('/notifications', isAuthenticated, asyncHandler(notificationController.getNotifications));

router.get('/notifications/unread-count', isAuthenticated, asyncHandler(notificationController.getUnreadCount));

router.post('/notifications/:id/read', isAuthenticated, asyncHandler(notificationController.markAsRead));

module.exports = router;