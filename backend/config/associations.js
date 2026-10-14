
const User = require('../modules/user/userModel');
const Destination = require('../modules/destination/destinationModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel');

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