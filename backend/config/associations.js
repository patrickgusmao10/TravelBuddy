const User = require('../modules/user/userModel');
const Destination = require('../modules/destination/destinationModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel');
const Follow = require('../modules/follow/followModel');
const Collection = require('../modules/collection/collectionModel');
const CollectionDestination = require('../modules/collection/collectionDestinationModel');

User.hasMany(Destination, { foreignKey: 'userId' });
Destination.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Destination.hasMany(Like, { foreignKey: 'destinationId' });
Like.belongsTo(Destination, { foreignKey: 'destinationId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Destination.hasMany(Comment, { foreignKey: 'destinationId' });
Comment.belongsTo(Destination, { foreignKey: 'destinationId' });

Follow.belongsTo(User, { as: 'Follower', foreignKey: 'followerId' });
Follow.belongsTo(User, { as: 'Following', foreignKey: 'followingId' });

User.hasMany(Collection, { foreignKey: 'userId' });
Collection.belongsTo(User, { foreignKey: 'userId' });

Collection.hasMany(CollectionDestination, { foreignKey: 'collectionId' });
CollectionDestination.belongsTo(Collection, { foreignKey: 'collectionId' });

Destination.hasMany(CollectionDestination, { foreignKey: 'destinationId' });
CollectionDestination.belongsTo(Destination, { foreignKey: 'destinationId' });