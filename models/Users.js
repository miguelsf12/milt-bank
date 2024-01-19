const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const generateEightDigitNumber = require('../helpers/generateNumbers');
const Data = require('./Data')

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    require: true
  },
  birth_date: {
    type: DataTypes.DATE,
    require: true
  },
  cpf: {
    type: DataTypes.STRING,
    require: true
  },
  email: {
    type: DataTypes.STRING,
    require: true
  },
  password: {
    type: DataTypes.STRING,
    require: true
  },
  numberOfAccount: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      is: /^(\d{8}-1)$/,
    },
  },
})

User.hasOne(Data);

// Adicionando um hook beforeCreate para gerar e verificar o número de conta no momento da criação
User.addHook('beforeCreate', async (user) => {
  let generatedNumber;
  let existingUser;

  do {
    generatedNumber = `${generateEightDigitNumber()}-1`;
    // Verificar se o número gerado já existe no banco de dados
    existingUser = await User.findOne({
      where: {
        numberOfAccount: generatedNumber,
      },
    });
    // Se existir, gere outro número
  } while (existingUser);

  // Atribuir o número de conta único ao usuário
  user.numberOfAccount = generatedNumber;
});

// Adicionando um hook afterCreate para criar a instância de Data associada ao usuário
User.addHook('afterCreate', async (user) => {
  // Criar uma instância de Data associada ao usuário
  const dataInstance = await Data.create({ amount: 1300.00, UserId: user.id });
});

module.exports = User
