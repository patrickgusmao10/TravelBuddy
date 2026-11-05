const followService = require('./followService');
const { success } = require('../../middlewares/apiResponse');

function parseUserId(rawValue) {
    const userId = Number(rawValue);

    if (!Number.isInteger(userId) || userId <= 0) {
        const error = new Error('Identificador de usuário inválido.');
        error.status = 400;
        throw error;
    }

    return userId;
}

exports.toggleFollow = async (req, res) => {
    const followingId = parseUserId(req.params.userId);
    const followerId = req.user.id;

    const result = await followService.toggleFollow(followerId, followingId);

    if (result.isFollowing) {
        return success(res, result, 'Seguindo com sucesso.', 201);
    }

    return success(res, result, 'Você deixou de seguir.');
};

exports.getFollowStatus = async (req, res) => {
    const followingId = parseUserId(req.params.userId);
    const followerId = req.user.id;

    const isFollowing = await followService.getFollowStatus(followerId, followingId);

    return success(res, { isFollowing });
};

exports.getFollowers = async (req, res) => {
    const followers = await followService.getFollowers(parseUserId(req.params.userId));

    return success(res, followers);
};

exports.getFollowing = async (req, res) => {
    const following = await followService.getFollowing(parseUserId(req.params.userId));

    return success(res, following);
};