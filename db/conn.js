const { Sequelize } = require('sequelize')

// RAILWAY
// const sequelize = new Sequelize({
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   dialect: 'mysql',
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
// })

// LOCALHOST
const sequelize = new Sequelize('miltbank', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
// LOCALHOST
try {
  sequelize.authenticate()
  console.log('Conectado com sucesso!')
} catch (err) {
  console.log(`Houve um erro: ${err}`)
}

module.exports = sequelize
