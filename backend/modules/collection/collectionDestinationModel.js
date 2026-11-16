const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const CollectionDestination = sequelize.define('CollectionDestination',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'collections',
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
        tableName: 'collection_destinations',
        indexes: [
            {
                unique: true,
                fields: ['collection_id', 'destination_id'],
                name: 'idx_unique_collection_destination'
            },
            {
                fields: ['destination_id'],
                name: 'idx_collection_destinations_destination_id'
            }
        ]
    }
);

module.exports = CollectionDestination;