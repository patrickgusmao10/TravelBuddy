const Report = require('./reportModel');
const Destination = require('../destination/destinationModel');

async function createReport(userId, destinationId, reason) {
    const destination = await Destination.findByPk(destinationId);

    if (!destination) {
        const error = new Error('Destino não encontrado.');
        error.status = 404;
        throw error;
    }

    if (destination.userId === userId) {
        const error = new Error('Você não pode denunciar o seu próprio destino.');
        error.status = 400;
        throw error;
    }

    const [report, created] = await Report.findOrCreate({
        where: { userId, destinationId: destination.id },
        defaults: { userId, destinationId: destination.id, reason }
    });

    if (!created) {
        const error = new Error('Você já denunciou este destino.');
        error.status = 409;
        throw error;
    }

    return report;
}

module.exports = { createReport };