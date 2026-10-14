
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Like = sequelize.define('Like',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'destinations',
        key: 'id'
      }
    }
  },
  {
    timestamps: true,
    tableName: 'likes',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'destination_id'],
        name: 'idx_unique_like'
      }
    ]
  }
);

module.exports = Like;