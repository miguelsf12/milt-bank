const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Data = require('../models/Data');

// Rota para obter o valor do banco de dados
router.get('/api/getAmount', async (req, res) => {
  try {
    const userId = req.session.userid

    const userDb = await User.findOne({
      where: {
        id: userId,
      },
      include: Data,
      plain: true
    })

    res.json({ amount: userDb.Datum.dataValues.amount });
  } catch (error) {
    console.error('Erro ao buscar o valor do banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
