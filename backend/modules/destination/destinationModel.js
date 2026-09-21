const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Destination = sequelize.define('Destination',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    timestamps: true,
    tableName: 'destinations',
    indexes: [
      { fields: ['user_id'], name: 'idx_destinations_user_id' }
    ]
  }
);

module.exports = Destination;