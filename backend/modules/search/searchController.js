const searchService = require('./searchService');
const { success } = require('../../middlewares/apiResponse');

// GET /api/search?q=...
exports.search = (req, res) => {
    const query = req.query.q || '';

    let searchResults = {
        destinations: [],
        users: []
    };

    if (query) {
        searchResults = searchService.globalSearch(query);
    }

    return success(res, {
        query,
        ...searchResults
    });
};