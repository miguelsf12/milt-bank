const User = require('../models/Users')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static welcome(req, res) {
    res.render('auth/welcome')
  }

  static register(req, res) {
    res.render('auth/register')
  }

  // se não possui um usuario com os mesmos dados
  static async registerPost(req, res) {
    const { name, birth_date, cpf, email, password, confirmPassword } = req.body

    const checkIfEmailExists = await User.findOne({ where: { email: email } })

    if (checkIfEmailExists) {
      req.flash('messageRegister', 'Este e-mail já está em uso!')
      res.render('auth/register')
      return
    }

    const checkIfUserExists = await User.findOne({ where: { cpf: cpf } })

    if (checkIfUserExists) {
      req.flash('messageRegister', 'Este CPF já está cadastrado!')
      res.render('auth/register')
      return
    }

    if (password != confirmPassword) {
      req.flash('messageRegister', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')
      return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      birth_date,
      cpf,
      email,
      password: hashedPassword
    }
    console.log(user)

    try {
      await User.create(user)
      req.flash('messageLogin', 'Sua conta foi criada com sucesso!')
      res.redirect('/login')
    } catch (error) {
      console.log(`Houve um erro: ${error}`)
    }
  }

  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    const { cpf, password } = req.body

    // find user
    const user = await User.findOne({ where: { cpf: cpf } })

    if (!user) {
      req.flash('messageLogin', 'Usuário não encontrado!')
      res.render('auth/login')
      return
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      req.flash('messageLogin', 'Senha inválida!')
      res.render('auth/login')
      return
    }

    // INICIALIZAR A SEÇÃO DA PESSOA
  }

  static reedemPassword(req, res) {
    res.render('auth/reedem-password')
  }

  static async reedemPasswordPost(req, res) {
    const { name, birth_date, cpf, email } = req.body

    // Formulario
    const user = {
      name,
      birth_date,
      cpf,
      email
    }

    const userDb = await User.findOne({ where: { name: name, birth_date: birth_date, cpf: cpf, email: email } })
    // PROCURAR POR CPF E EMAIL APENAS E TALVEZ COMPARAR OBJETOS

    if (!userDb) {
      console.log('user nao encontrado')
      res.render('auth/login')
      return
    }

    res.redirect('/reedem')
  }

  static reedem(req, res) {
    res.render('auth/reedem')
  }

  static reedemPost(req, res) {
    const { password } = req.body

    // trocar a senha e enviar para o DB
    res.redirect('/login')
  }
}
