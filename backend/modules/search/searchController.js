const searchService = require('./searchService');
const { success } = require('../../middlewares/apiResponse');
const { SEARCH } = require('../../config/constants');

exports.search = async (req, res) => {
    const rawQuery = typeof req.query.q === 'string' ? req.query.q : '';
    const query = rawQuery.trim().slice(0, SEARCH.MAX_LENGTH);

    let results = {
        destinations: [],
        users: []
    };

    if (query.length >= SEARCH.MIN_LENGTH) {
        results = await searchService.globalSearch(query);
    }

    return success(res, { query, ...results });
};