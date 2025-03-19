const jwt = require('jsonwebtoken');
const loginRepository = require('../repositories/loginRepository');
const comparePassword = require('../utils/comparePassword');

const loginController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await loginRepository.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          error: 'E-mail ou senha incorretos.',
        });
      }

      const match = await comparePassword(senha, user.senha);
      if (!match) {
        return res.status(400).json({
          error: 'E-mail ou senha incorretos.',
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          nome: user.nome,
          telefone: user.telefone,
          funcao: user.funcao,
          user_type: user.user_type,
          status: user.status,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.cookie('session_id', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(200).json({
        message: 'Login realizado com sucesso.',
        token,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao fazer login.',
      });
    }
  },

  logout: (req, res) => {
    res.clearCookie('session_id');
    res.status(200).json({
      message: 'Logout realizado com sucesso.',
    });
  },

  getCurrentUser: (req, res) => {
    const user = req.user;
    res.json(user);
  },
};

module.exports = loginController;
