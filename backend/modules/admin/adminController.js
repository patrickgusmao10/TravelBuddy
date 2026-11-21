const adminService = require('./adminService');
const destinationService = require('../destination/destinationService');
const { success } = require('../../middlewares/apiResponse');
const { parseId } = require('../../utils/parseId');
const { parsePagination } = require('../../utils/pagination');
const { SEARCH } = require('../../config/constants');

function readSearch(req) {
  const raw = typeof req.query.search === 'string' ? req.query.search : '';
  return raw.trim().slice(0, SEARCH.MAX_LENGTH);
}

exports.getDashboard = async (req, res) => {
  const stats = await adminService.getDashboardStats();

  return success(res, stats);
};

exports.getReports = async (req, res) => {
  const { page, limit } = parsePagination(req.query);
  const status = req.query.status || 'pending';

  const reports = await adminService.getReports(status, page, limit);

  return success(res, reports);
};

exports.reviewReport = async (req, res) => {
  const reportId = parseId(req.params.id, 'denúncia');

  const result = await adminService.reviewReport(reportId);

  return success(res, result, 'Denúncia marcada como revisada.');
};

exports.getUsers = async (req, res) => {
  const { page, limit } = parsePagination(req.query);

  const users = await adminService.getUsers(readSearch(req), page, limit);

  return success(res, users);
};

exports.setUserBlocked = async (req, res) => {
  const userId = parseId(req.params.id, 'usuário');
  const { isBlocked } = req.body;

  const result = await adminService.setUserBlocked(
    userId,
    isBlocked,
    req.user.id
  );

  return success(
    res,
    result,
    isBlocked ? 'Usuário bloqueado.' : 'Usuário desbloqueado.'
  );
};

exports.getDestinations = async (req, res) => {
  const { page, limit } = parsePagination(req.query);

  const destinations = await adminService.getDestinations(
    readSearch(req),
    page,
    limit
  );

  return success(res, destinations);
};

exports.deleteDestination = async (req, res) => {
  const destinationId = parseId(req.params.id, 'destino');

  await destinationService.deleteDestination(
    destinationId,
    req.user.id,
    true
  );

  return success(res, null, 'Destino excluído pela administração.');
};