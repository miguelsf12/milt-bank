require('dotenv').config()

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
// Routes
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const apiRoutes = require('./routes/apiRoutes')
const transfersRoutes = require('./routes/transfersRoutes')

// Controllers
const AuthController = require('./controllers/AuthController')
const HomeController = require('./controllers/HomeController')


// Conexão
const conn = require('./db/conn') // Conexão
const sequelize = require('./db/conn')

// Models
const User = require('./models/Users')
const Data = require('./models/Data')
const TransferController = require('./controllers/TransferController')
const app = express()

// Template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Receber dados do body
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'milt_secret',
    resave: false,
    saveUninitialized: false, // certo é false
    store: new FileStore({
      log() { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  })
)

// flash messages
app.use(flash())

// public
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// Routes
app.use('milt/pix/', transfersRoutes)
app.use('milt/', homeRoutes)
app.use('/', apiRoutes)
app.use('/', authRoutes)

app.get('/', AuthController.welcome)
app.get('/milt/home', HomeController.home)
app.get('/login', AuthController.login)
app.get('/milt/pix', HomeController.pix)
app.get('/milt/pix/pagar',TransferController.pay)
app.get('/milt/pix/registerKey',TransferController.registerKey)
app.post('/milt/pix/registerKey',TransferController.registerKeyPost)
app.get('/reedem-password', AuthController.reedemPassword)
app.get('/register', AuthController.register)
app.post('/register', AuthController.registerPost)
app.post('/login', AuthController.loginPost)
app.post('/reedem-password', AuthController.reedemPasswordPost)

// LOCALHOST
// conn
//   // .sync({ force: true })
//   .sync()
//   .then(() => {
//     app.listen(3000 || process.env.PORT)
//   }).catch((err) => {
//     console.log(err)
//   })

// RAILWAY
sequelize.sync({force: true})
app.listen(3000 || process.env.PORT, () => {
  console.log('Conectado com sucesso')
})
