const sequelize = require('../../config/database');
const Collection = require('./collectionModel');
const CollectionDestination = require('./collectionDestinationModel');
const Destination = require('../destination/destinationModel');
const User = require('../user/userModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findOwnedCollectionOrFail(collectionId, userId) {
    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
        const error = new Error('Coleção não encontrada.');
        error.status = 404;
        throw error;
    }

    if (collection.userId !== userId) {
        const error = new Error('Você não tem permissão para alterar esta coleção.');
        error.status = 403;
        throw error;
    }

    return collection;
}

async function createCollection(userId, title, description, isPublic) {
    return await Collection.create({
        userId,
        title,
        description: description || null,
        isPublic: isPublic === true
    });
}

async function getUserCollections(userId) {
    return await Collection.findAll({
        where: { userId },
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
}

async function getCollectionById(collectionId, currentUserId = null) {
    const collection = await Collection.findByPk(collectionId, {
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
    });

    if (!collection) {
        const error = new Error('Coleção não encontrada.');
        error.status = 404;
        throw error;
    }

    const isOwner = currentUserId !== null && collection.userId === currentUserId;

    if (!collection.isPublic && !isOwner) {
        const error = new Error('Esta coleção é privada.');
        error.status = 403;
        throw error;
    }

    const entries = await CollectionDestination.findAll({
        where: { collectionId: collection.id },
        include: [{
            model: Destination,
            include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
        }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });

    return {
        collection,
        destinations: entries.map((entry) => entry.Destination),
        isOwner
    };
}

async function addDestinationToCollection(collectionId, destinationId, userId) {
    const collection = await findOwnedCollectionOrFail(collectionId, userId);

    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
        const error = new Error('Destino não encontrado.');
        error.status = 404;
        throw error;
    }

    const added = await sequelize.transaction(async (t) => {
        const [, created] = await CollectionDestination.findOrCreate({
            where: { collectionId: collection.id, destinationId: destination.id },
            defaults: { collectionId: collection.id, destinationId: destination.id },
            transaction: t
        });

        if (created) {
            await collection.increment('destinationsCount', { transaction: t });
        }

        return created;
    });

    await collection.reload();

    return { added, destinationsCount: collection.destinationsCount };
}

async function removeDestinationFromCollection(collectionId, destinationId, userId) {
    const collection = await findOwnedCollectionOrFail(collectionId, userId);

    const removed = await sequelize.transaction(async (t) => {
        const deletedRows = await CollectionDestination.destroy({
            where: { collectionId: collection.id, destinationId },
            transaction: t
        });

        if (deletedRows > 0) {
            await collection.decrement('destinationsCount', { transaction: t });
        }

        return deletedRows > 0;
    });

    if (!removed) {
        const error = new Error('Este destino não está na coleção.');
        error.status = 404;
        throw error;
    }

    await collection.reload();

    return { destinationsCount: collection.destinationsCount };
}

async function deleteCollection(collectionId, userId) {
    const collection = await findOwnedCollectionOrFail(collectionId, userId);

    await sequelize.transaction(async (t) => {
        await CollectionDestination.destroy({
            where: { collectionId: collection.id },
            transaction: t
        });

        await collection.destroy({ transaction: t });
    });
}

async function getCollectionsStatusForDestination(userId, destinationId) {
    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
        const error = new Error('Destino não encontrado.');
        error.status = 404;
        throw error;
    }

    const collections = await getUserCollections(userId);

    const entries = await CollectionDestination.findAll({
        where: { destinationId: destination.id },
        attributes: ['collectionId']
    });

    const collectionIdsWithDestination = new Set(
        entries.map((entry) => entry.collectionId)
    );

    return collections.map((collection) => ({
        id: collection.id,
        title: collection.title,
        isPublic: collection.isPublic,
        destinationsCount: collection.destinationsCount,
        hasDestination: collectionIdsWithDestination.has(collection.id)
    }));
}

module.exports = {
    createCollection,
    getUserCollections,
    getCollectionById,
    addDestinationToCollection,
    removeDestinationFromCollection,
    deleteCollection,
    getCollectionsStatusForDestination
};