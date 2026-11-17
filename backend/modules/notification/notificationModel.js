const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { NOTIFICATION } = require('../../config/constants');

const Notification = sequelize.define('Notification',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        actorId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        type: { type: DataTypes.ENUM(...Object.values(NOTIFICATION.TYPES)), allowNull: false },
        destinationId: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'destinations', key: 'id' } },
        isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    {
        timestamps: true,
        tableName: 'notifications',
        indexes: [
            { fields: ['user_id', 'is_read'], name: 'idx_notifications_user_read' },
            { fields: ['destination_id'], name: 'idx_notifications_destination_id' }
        ]
    }
);

module.exports = Notification;