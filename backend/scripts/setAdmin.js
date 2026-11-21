require('dotenv').config();

const sequelize = require('../config/database');
const User = require('../modules/user/userModel');

async function setAdmin() {
  const username = process.argv[2];
  const isAdmin = process.argv[3] !== 'off';

  try {
    if (!username) {
      console.error('Informe o username do usuário.');
      process.exitCode = 1;
      return;
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error('Usuário não encontrado.');
      process.exitCode = 1;
      return;
    }

    await user.update({ isAdmin });

    console.log(
      isAdmin
        ? `Usuário ${username} promovido a administrador.`
        : `Permissão de administrador removida do usuário ${username}.`
    );
  } catch (err) {
    console.error('Erro ao atualizar administrador:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

setAdmin();