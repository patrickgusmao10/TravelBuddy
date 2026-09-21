const destinationService = require('./destinationService');

async function uploadDestination(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Imagem é obrigatória'
      });
    }

    const { title, description } = req.body;
    const userId = req.user.id;

    const imagePath = `/uploads/destinations/${req.file.filename}`;

    const destination = await destinationService.createDestination({
      title,
      description,
      imagePath,
      userId
    });

    return res.status(201).json({
      success: true,
      message: 'Destino criado com sucesso',
      data: {
        destination
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadDestination
};