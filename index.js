require('dotenv').config()
console.log(process.env)

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const authRoutes = require('./routes/authRoutes')

// Controllers
const AuthController = require('./controllers/AuthController')

// Conexão
const conn = require('./db/conn') // Conexão

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
    saveUninitialized: false,
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

app.use('/', authRoutes)

app.get('/', AuthController.welcome)
app.get('/login', AuthController.login)

// app.get('/register', AuthController.register)
// app.post('/register', AuthController.registerPost)
// app.post('/login', AuthController.loginPost)
// app.get('/reedem-password', AuthController.reedemPassword)
// app.post('/reedem-password', AuthController.reedemPasswordPost)
// app.get('/reedem', AuthController.reedem)
// app.post('/reedem', AuthController.reedemPost)

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000)
  }).catch((err) => {
    console.log(err)
  })
