module.exports = {
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 12,
        MAX_LIMIT: 50
    },
    VALIDATION: {
        USERNAME_MIN: 3,
        USERNAME_MAX: 20,
        PASSWORD_MIN: 6,
        BIO_MAX: 255,
        DESCRIPTION_MAX: 500,
        TITLE_MAX: 100,
        COMMENT_MAX: 500,
        COLLECTION_TITLE_MIN: 3,
        COLLECTION_TITLE_MAX: 100,
        COLLECTION_DESCRIPTION_MAX: 500
    },
    SEARCH: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 100,
        LIMIT: 10
    },
    NOTIFICATION: {
        TYPES: {
            LIKE: 'like',
            COMMENT: 'comment',
            FOLLOW: 'follow'
        }
    },
    REPORT: {
        REASONS: ['inappropriate_content', 'harassment', 'spam', 'copyright', 'other'],
        STATUS: {
            PENDING: 'pending',
            REVIEWED: 'reviewed'
        }
    },
    ADMIN: {
        REPORT_FILTERS: ['pending', 'reviewed', 'all']
    }
};