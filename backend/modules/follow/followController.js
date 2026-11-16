const followService = require('./followService');
const destinationService = require('../destination/destinationService');
const { success } = require('../../middlewares/apiResponse');
const { parsePagination } = require('../../utils/pagination');
const { parseId } = require('../../utils/parseId');

exports.toggleFollow = async (req, res) => {
    const followingId = parseId(req.params.userId, 'usuário');
    const followerId = req.user.id;

    const result = await followService.toggleFollow(followerId, followingId);

    if (result.isFollowing) {
        return success(res, result, 'Seguindo com sucesso.', 201);
    }

    return success(res, result, 'Você deixou de seguir.');
};

exports.getFollowStatus = async (req, res) => {
    const followingId = parseId(req.params.userId, 'usuário');
    const followerId = req.user.id;

    const isFollowing = await followService.getFollowStatus(followerId, followingId);

    return success(res, { isFollowing });
};

exports.getFollowers = async (req, res) => {
    const followers = await followService.getFollowers(parseId(req.params.userId, 'usuário'));

    return success(res, followers);
};

exports.getFollowing = async (req, res) => {
    const following = await followService.getFollowing(parseId(req.params.userId, 'usuário'));

    return success(res, following);
};

exports.getFollowingDestinations = async (req, res) => {
    const userId = req.user.id;
    const { page, limit } = parsePagination(req.query);

    const destinations = await destinationService.getFollowingDestinations(userId, page, limit);

    return success(res, destinations);
};