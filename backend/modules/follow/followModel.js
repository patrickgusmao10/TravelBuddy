const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Follow = sequelize.define('Follow',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        followerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
        followingId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
    },
    {
        timestamps: true,
        tableName: 'follows',
        indexes: [
            // Uma pessoa só segue outra uma vez
            { unique: true, fields: ['follower_id', 'following_id'], name: 'idx_unique_follow' },

            // Acelera "quem segue X?" (a coluna following_id não é a primeira do índice acima)
            { fields: ['following_id'], name: 'idx_follows_following_id' }
        ]
    }
);

module.exports = Follow;