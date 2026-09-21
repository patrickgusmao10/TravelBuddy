const User = require('../modules/user/userModel');
const Destination = require('../modules/destination/destinationModel');

User.hasMany(Destination, { foreignKey: 'userId' });
Destination.belongsTo(User, { foreignKey: 'userId' });