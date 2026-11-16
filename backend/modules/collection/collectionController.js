const collectionService = require('./collectionService');
const { success } = require('../../middlewares/apiResponse');
const { parseId } = require('../../utils/parseId');

exports.createCollection = async (req, res) => {
    const { title, description, isPublic } = req.body;
    const userId = req.user.id;

    const collection = await collectionService.createCollection(
        userId, title, description, isPublic
    );

    return success(res, collection, 'Coleção criada com sucesso!', 201);
};

exports.getMyCollections = async (req, res) => {
    const collections = await collectionService.getUserCollections(req.user.id);

    return success(res, collections);
};

exports.getCollectionDetails = async (req, res) => {
    const collectionId = parseId(req.params.id, 'coleção');
    const currentUserId = req.user ? req.user.id : null;

    const { collection, destinations, isOwner } =
        await collectionService.getCollectionById(collectionId, currentUserId);

    return success(res, {
        ...collection.toJSON(),
        Destinations: destinations,
        isOwner
    });
};

exports.addDestinationToCollection = async (req, res) => {
    const collectionId = parseId(req.params.id, 'coleção');
    const destinationId = parseId(req.body.destinationId, 'destino');

    const result = await collectionService.addDestinationToCollection(
        collectionId, destinationId, req.user.id
    );

    if (result.added) {
        return success(res, result, 'Destino adicionado à coleção.', 201);
    }

    return success(res, result, 'O destino já estava na coleção.');
};

exports.removeDestinationFromCollection = async (req, res) => {
    const collectionId = parseId(req.params.id, 'coleção');
    const destinationId = parseId(req.params.destinationId, 'destino');

    const result = await collectionService.removeDestinationFromCollection(
        collectionId, destinationId, req.user.id
    );

    return success(res, result, 'Destino removido da coleção.');
};

exports.deleteCollection = async (req, res) => {
    const collectionId = parseId(req.params.id, 'coleção');

    await collectionService.deleteCollection(collectionId, req.user.id);

    return success(res, null, 'Coleção excluída com sucesso!');
};

exports.getCollectionsStatus = async (req, res) => {
    const destinationId = parseId(req.params.destinationId, 'destino');

    const collections = await collectionService.getCollectionsStatusForDestination(
        req.user.id, destinationId
    );

    return success(res, collections);
};