const Notification = require('./notificationModel');
const User = require('../user/userModel');
const Destination = require('../destination/destinationModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function createNotification({ userId, actorId, type, destinationId = null }, transaction) {
    if (userId === actorId) {
        return null;
    }

    return await Notification.create({ userId, actorId, type, destinationId }, { transaction });
}

async function removeNotification({ userId, actorId, type, destinationId = null }, transaction) {
    await Notification.destroy({ where: { userId, actorId, type, destinationId }, transaction });
}

async function getUserNotifications(userId, page, limit) {
    return await Notification.findAll({
        where: { userId },
        include: [
            { model: User, as: 'Actor', attributes: AUTHOR_ATTRIBUTES },
            { model: Destination, attributes: ['id', 'title', 'imagePath'] }
        ],
        order: [['createdAt', 'DESC'], ['id', 'DESC']],
        limit,
        offset: (page - 1) * limit
    });
}

async function getUnreadCount(userId) {
    return await Notification.count({ where: { userId, isRead: false } });
}

async function markAsRead(notificationId, userId) {
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
        const error = new Error('Notificação não encontrada.');
        error.status = 404;
        throw error;
    }

    if (notification.userId !== userId) {
        const error = new Error('Você não tem permissão para alterar esta notificação.');
        error.status = 403;
        throw error;
    }

    if (!notification.isRead) {
        await notification.update({ isRead: true });
    }

    return { id: notification.id, isRead: true, unreadCount: await getUnreadCount(userId) };
}

module.exports = { createNotification, removeNotification, getUserNotifications, getUnreadCount, markAsRead };