const reportService = require('./reportService');
const { success } = require('../../middlewares/apiResponse');
const { parseId } = require('../../utils/parseId');

exports.reportDestination = async (req, res) => {
    const destinationId = parseId(req.params.destinationId, 'destino');

    const { reason } = req.body;

    const report = await reportService.createReport(req.user.id, destinationId, reason);

    return success(res, {
        id: report.id,
        destinationId: report.destinationId,
        reason: report.reason
    }, 'Denúncia enviada. Obrigado por ajudar a manter a comunidade segura.', 201);
};