const moment = require('moment')

module.exports.checkAge = function (req, res, next) {
  const birth_date = req.body.birth_date

  if (!moment(birth_date, 'DD/MM/YYYY').isValid()) {
    req.flash('messageRegister', 'Data de nascimento inválida')
    res.render('auth/register')
    return
  }

  const birthMoment = moment(birth_date, 'DD/MM/YYYY')

  const today = moment()
  const age = today.diff(birthMoment, 'years')

  const idadeMinima = 18

  if (age < idadeMinima) {
    req.flash('messageRegister', 'Você precisa ter mais de 18 anos para prosseguir!')
    res.render('auth/register')
    return
  }

  next()
}
