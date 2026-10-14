
const commentService = require('./commentService');
const { success } = require('../../middlewares/apiResponse');

exports.addComment = async (req, res) => {
  const destinationId = req.params.destinationId;
  const userId = req.user.id;
  const { content } = req.body;

  const comment = await commentService.addComment(userId, destinationId, content);

  return success(res, comment, 'Comentário adicionado com sucesso!', 201);
};

exports.getComments = async (req, res) => {
  const destinationId = req.params.destinationId;

  const comments = await commentService.getCommentsByDestinationId(destinationId);

  return success(res, comments);
};