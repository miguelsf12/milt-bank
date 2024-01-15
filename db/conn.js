const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('miltbank', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectado com sucesso!')
} catch (err) {
  console.log(`Houve um erro: ${err}`)
}

module.exports = sequelize
