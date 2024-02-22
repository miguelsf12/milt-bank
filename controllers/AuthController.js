const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { badRequest, serverError } = require('../helpers/errorHandler')

module.exports = class AuthController {
  static welcome(req, res) {
    res.render('auth/welcome')
  }

  static register(req, res) {
    res.render('auth/register')
  }

  // se não possui um usuario com os mesmos dados
  static async registerPost(req, res) {
    try {
      const { name, birth_date, cpf, email, password, confirmPassword } = req.body

      // Verifica se o CPF está no formato correto
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

      if (!cpfRegex.test(cpf)) {
        return badRequest(req, res, 'Formato de CPF inválido! Utilize o formato 000.000.000-00', 'messageRegister', 'auth/register')
      }

      const checkIfEmailExists = await User.findOne({ where: { email: email } })

      if (checkIfEmailExists) {
        return badRequest(req, res, 'Este e-mail já está em uso!', 'messageRegister', 'auth/register');
      }

      const checkIfUserExists = await User.findOne({ where: { cpf: cpf } })

      if (checkIfUserExists) {
        return badRequest(req, res, 'Este CPF já está cadastrado!', 'messageRegister', 'auth/register')
      }

      if (password != confirmPassword) {
        return badRequest(req, res, 'As senhas não conferem, tente novamente!', 'messageRegister', 'auth/register')
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


      await User.create(user)
      req.flash('messageLogin', 'Sua conta foi criada com sucesso!')
      res.redirect('/login')
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    try {
      const { cpf, password } = req.body

      // find user
      const user = await User.findOne({ where: { cpf: cpf } })

      if (!user) {
        return badRequest(req, res, 'Usuário não encontrado!', 'messageLogin', 'auth/login')
      }

      const passwordMatch = bcrypt.compareSync(password, user.password)

      if (!passwordMatch) {
        return badRequest(req, res, 'Senha inválida!', 'messageLogin', 'auth/login')
      }

      // INICIALIZAR A SEÇÃO DA PESSOA
      req.session.userid = user.id
      // console.log(req.session.userid)
      req.session.save(() => {
        res.redirect('milt/home')
      })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static reedemPassword(req, res) {
    res.render('auth/reedem-password')
  }

  static async reedemPasswordPost(req, res) {
    try {
      const { name, cpf, email, newPassword } = req.body

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(newPassword, salt)

      // Formulario
      const user = {
        password: hashedPassword
      }

      await User.update(user, { where: { cpf: cpf } })
      req.flash('messageLogin', 'Senha alterada com sucesso!')
      res.render('auth/login')
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }
}
