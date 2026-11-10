const { PAGINATION } = require('../config/constants');

function parsePagination(query) {
    const page = Number.parseInt(query.page, 10);
    const limit = Number.parseInt(query.limit, 10);

    return {
        page: page >= 1 ? page : PAGINATION.DEFAULT_PAGE,
        limit: limit >= 1 ? Math.min(limit, PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    };
}

module.exports = { parsePagination };