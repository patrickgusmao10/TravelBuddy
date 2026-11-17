const notificationService = require('./notificationService');
const { success } = require('../../middlewares/apiResponse');
const { parseId } = require('../../utils/parseId');
const { parsePagination } = require('../../utils/pagination');

exports.getNotifications = async (req, res) => {
    const { page, limit } = parsePagination(req.query);

    const notifications = await notificationService.getUserNotifications(req.user.id, page, limit);

    return success(res, notifications);
};

exports.getUnreadCount = async (req, res) => {
    const unreadCount = await notificationService.getUnreadCount(req.user.id);

    return success(res, { unreadCount });
};

exports.markAsRead = async (req, res) => {
    const notificationId = parseId(req.params.id, 'notificação');

    const result = await notificationService.markAsRead(notificationId, req.user.id);

    return success(res, result, 'Notificação marcada como lida.');
};