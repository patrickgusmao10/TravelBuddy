const { Op } = require('sequelize');
const Destination = require('../destination/destinationModel');
const User = require('../user/userModel');
const { SEARCH } = require('../../config/constants');

function escapeLike(text) {
    return text.replace(/[\\%_]/g, '\\$&');
}

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function searchDestinations(query) {
    const pattern = `%${escapeLike(query)}%`;

    return await Destination.findAll({
        where: { title: { [Op.like]: pattern } },
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']],
        limit: SEARCH.LIMIT
    });
}

async function searchUsers(query) {
    const pattern = `%${escapeLike(query)}%`;

    return await User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.like]: pattern } },
                { fullName: { [Op.like]: pattern } }
            ]
        },
        attributes: AUTHOR_ATTRIBUTES,
        order: [['username', 'ASC']],
        limit: SEARCH.LIMIT
    });
}

async function globalSearch(query) {
    const [destinations, users] = await Promise.all([
        searchDestinations(query),
        searchUsers(query)
    ]);

    return { destinations, users };
}

module.exports = { globalSearch };