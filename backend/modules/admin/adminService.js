const { Op, fn, col } = require('sequelize');
const User = require('../user/userModel');
const Destination = require('../destination/destinationModel');
const Like = require('../like/likeModel');
const Comment = require('../comment/commentModel');
const Report = require('../report/reportModel');
const { REPORT } = require('../../config/constants');
const escapeLike = require('../../utils/escapeLike');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

function buildSearchFilter(search, columns) {
  if (!search) {
    return {};
  }

  const pattern = `%${escapeLike(search)}%`;

  return {
    [Op.or]: columns.map((column) => ({
      [column]: { [Op.like]: pattern }
    }))
  };
}

async function getDashboardStats() {
  const [
    users,
    blockedUsers,
    destinations,
    comments,
    likes,
    pendingReports,
    reviewedReports
  ] = await Promise.all([
    User.count(),
    User.count({ where: { isBlocked: true } }),
    Destination.count(),
    Comment.count(),
    Like.count(),
    Report.count({ where: { status: REPORT.STATUS.PENDING } }),
    Report.count({ where: { status: REPORT.STATUS.REVIEWED } })
  ]);

  return {
    users,
    blockedUsers,
    destinations,
    comments,
    likes,
    pendingReports,
    reviewedReports
  };
}

async function getReports(status, page, limit) {
  const where = status === 'all' ? {} : { status };

  return await Report.findAll({
    where,
    include: [
      {
        model: User,
        as: 'Reporter',
        attributes: AUTHOR_ATTRIBUTES
      },
      {
        model: Destination,
        attributes: ['id', 'title', 'imagePath', 'userId'],
        include: [{
          model: User,
          attributes: AUTHOR_ATTRIBUTES
        }]
      }
    ],
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit,
    offset: (page - 1) * limit
  });
}

async function reviewReport(reportId) {
  const report = await Report.findByPk(reportId);

  if (!report) {
    const error = new Error('Denúncia não encontrada.');
    error.status = 404;
    throw error;
  }

  if (report.status !== REPORT.STATUS.REVIEWED) {
    await report.update({
      status: REPORT.STATUS.REVIEWED,
      reviewedAt: new Date()
    });

    await report.reload();
  }

  return {
    id: report.id,
    status: report.status,
    reviewedAt: report.reviewedAt
  };
}

async function getUsers(search, page, limit) {
  return await User.findAll({
    where: buildSearchFilter(search, ['username', 'email', 'fullName']),
    attributes: [
      'id',
      'username',
      'email',
      'fullName',
      'profilePicture',
      'destinationsCount',
      'followersCount',
      'isBlocked',
      'isAdmin',
      'createdAt'
    ],
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit,
    offset: (page - 1) * limit
  });
}

async function setUserBlocked(targetUserId, isBlocked, adminId) {
  const user = await User.findByPk(targetUserId);

  if (!user) {
    const error = new Error('Usuário não encontrado.');
    error.status = 404;
    throw error;
  }

  if (user.id === adminId) {
    const error = new Error('Você não pode bloquear a si mesmo.');
    error.status = 400;
    throw error;
  }

  if (user.isAdmin) {
    const error = new Error('Administradores não podem ser bloqueados.');
    error.status = 403;
    throw error;
  }

  if (user.isBlocked !== isBlocked) {
    await user.update({ isBlocked });
  }

  return {
    id: user.id,
    username: user.username,
    isBlocked: user.isBlocked
  };
}

async function getDestinations(search, page, limit) {
  const destinations = await Destination.findAll({
    where: buildSearchFilter(search, ['title']),
    include: [{
      model: User,
      attributes: AUTHOR_ATTRIBUTES
    }],
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit,
    offset: (page - 1) * limit
  });

  if (destinations.length === 0) {
    return [];
  }

  const counts = await Report.findAll({
    where: {
      destinationId: {
        [Op.in]: destinations.map((destination) => destination.id)
      },
      status: REPORT.STATUS.PENDING
    },
    attributes: [
      'destinationId',
      [fn('COUNT', col('id')), 'total']
    ],
    group: ['destinationId'],
    raw: true
  });

  const totalByDestination = new Map(
    counts.map((row) => [
      row.destinationId,
      Number(row.total)
    ])
  );

  return destinations.map((destination) => ({
    ...destination.toJSON(),
    pendingReportsCount: totalByDestination.get(destination.id) || 0
  }));
}

module.exports = {
  getDashboardStats,
  getReports,
  reviewReport,
  getUsers,
  setUserBlocked,
  getDestinations
};