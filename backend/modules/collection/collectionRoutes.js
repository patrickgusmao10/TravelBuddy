const express = require('express');
const router = express.Router();

const collectionController = require('./collectionController');
const { createCollectionValidator } = require('./collectionValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const { optionalAuth } = require('../../middlewares/optionalAuth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.get('/my-collections', isAuthenticated,
    asyncHandler(collectionController.getMyCollections));

router.post('/collections', isAuthenticated, createCollectionValidator,
    asyncHandler(collectionController.createCollection));

router.get('/collections/:id', optionalAuth,
    asyncHandler(collectionController.getCollectionDetails));

router.delete('/collections/:id', isAuthenticated,
    asyncHandler(collectionController.deleteCollection));

router.post('/collections/:id/destinations', isAuthenticated,
    asyncHandler(collectionController.addDestinationToCollection));

router.delete('/collections/:id/destinations/:destinationId', isAuthenticated,
    asyncHandler(collectionController.removeDestinationFromCollection));

router.get('/destinations/:destinationId/collections-status', isAuthenticated,
    asyncHandler(collectionController.getCollectionsStatus));

module.exports = router;