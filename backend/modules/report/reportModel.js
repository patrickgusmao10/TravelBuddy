const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { REPORT } = require('../../config/constants');

const Report = sequelize.define('Report',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        destinationId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'destinations', key: 'id' } },
        reason: { type: DataTypes.ENUM(...REPORT.REASONS), allowNull: false }
    },
    {
        timestamps: true,
        tableName: 'reports',
        indexes: [
            { unique: true, fields: ['user_id', 'destination_id'], name: 'idx_unique_report' },
            { fields: ['destination_id'], name: 'idx_reports_destination_id' }
        ]
    }
);

module.exports = Report;