const userService = require('./userService');
const { generateToken } = require('../../config/jwt');
const { success } = require('../../middlewares/apiResponse');

exports.register = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  const newUser = await userService.registerUser(
    username,
    email,
    password,
    fullName
  );

  return success(
    res,
    newUser,
    'Conta criada com sucesso! Faça login para continuar.',
    201
  );
};

exports.getPublicProfile = async (req, res) => {
  const user = await userService.getPublicProfile(req.params.username);

  return success(res, user);
};

exports.login = async (req, res) => {
  const { login, password } = req.body;

  const user = await userService.loginUser(login, password);
  const userData = await userService.getUserProfile(user.id);

  const token = generateToken({
    id: userData.id,
    username: userData.username,
    isAdmin: userData.isAdmin
  });

  return success(
    res,
    { token, user: userData },
    `Bem-vindo de volta, ${userData.username}!`
  );
};

exports.logout = (req, res) => {
  return success(
    res,
    null,
    'Logout realizado com sucesso.'
  );
};

exports.getMyProfile = async (req, res) => {
  const userData = await userService.getUserProfile(req.user.id);

  return success(res, userData);
};

exports.updateProfile = async (req, res) => {
  const { fullName, bio } = req.body;
  const userId = req.user.id;
  const newProfilePictureFilename = req.file ? req.file.filename : null;

  const updatedUser = await userService.updateUserProfile(
    userId,
    fullName,
    bio,
    newProfilePictureFilename
  );

  return success(res, updatedUser, 'Perfil atualizado com sucesso!');
};