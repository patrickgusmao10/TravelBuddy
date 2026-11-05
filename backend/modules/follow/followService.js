const sequelize = require('../../config/database');
const Follow = require('./followModel');
const User = require('../user/userModel');

const PERSON_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findUserOrFail(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
        const error = new Error('Usuário não encontrado.');
        error.status = 404;
        throw error;
    }

    return user;
}

async function toggleFollow(followerId, followingId) {
    if (followerId === followingId) {
        const error = new Error('Você não pode seguir a si mesmo.');
        error.status = 400;
        throw error;
    }

    const target = await findUserOrFail(followingId);

    const isFollowing = await sequelize.transaction(async (t) => {
        const [follow, created] = await Follow.findOrCreate({
            where: { followerId, followingId },
            defaults: { followerId, followingId },
            transaction: t
        });

        if (created) {
            await User.increment('followersCount', { where: { id: followingId }, transaction: t });
            await User.increment('followingCount', { where: { id: followerId }, transaction: t });
            return true;
        }

        await follow.destroy({ transaction: t });
        await User.decrement('followersCount', { where: { id: followingId }, transaction: t });
        await User.decrement('followingCount', { where: { id: followerId }, transaction: t });
        return false;
    });

    await target.reload();

    return { isFollowing, followersCount: target.followersCount };
}

async function getFollowStatus(followerId, followingId) {
    if (!followerId || !followingId) {
        return false;
    }

    const follow = await Follow.findOne({ where: { followerId, followingId } });
    return !!follow;
}

async function getFollowers(userId) {
    await findUserOrFail(userId);

    const follows = await Follow.findAll({
        where: { followingId: userId },
        include: [{ model: User, as: 'Follower', attributes: PERSON_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });

    return follows.map((follow) => follow.Follower);
}

async function getFollowing(userId) {
    await findUserOrFail(userId);

    const follows = await Follow.findAll({
        where: { followerId: userId },
        include: [{ model: User, as: 'Following', attributes: PERSON_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });

    return follows.map((follow) => follow.Following);
}

module.exports = { toggleFollow, getFollowStatus, getFollowers, getFollowing };