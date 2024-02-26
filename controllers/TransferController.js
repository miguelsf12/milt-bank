const User = require('../models/Users')
const Data = require('../models/Data')
const { badRequest, serverError } = require('../helpers/errorHandler')

module.exports = class TransferController {
  static registerKey(req, res) {
    res.render('milt/pix/registerKey', { layout: 'miltHome' })
  }

  static async registerKeyPost(req, res) {
    try {
      const keyPix = req.body.pix
      const userId = req.session.userid
      const user = await User.findOne({ where: { id: userId } })

      console.log(user.cpf)

      if (keyPix !== user.cpf && keyPix !== user.email) {
        return badRequest(req, res, 'Chave inválida', 'messageRegisterPix', 'milt/pix/registerKey', { layout: 'miltHome' })
      }

      await Data.update({ pix: keyPix }, { where: { UserId: userId } })
      res.redirect('/milt/pix')
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async pay(req, res) {
    try {
      res.render('milt/pix/pagar', { layout: 'miltHome' })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async confirmPayment(req, res) {
    try {
      const userId = req.session.userid

      const userLoggedData = await Data.findOne({ where: { UserId: userId } })
      const amountUser = userLoggedData.amount.replace('.', ',')

      const key = req.query.key

      const recipientUserData = await Data.findOne({ where: { pix: key }, raw: true })

      const receivingUserFound = await User.findOne({ where: { id: recipientUserData.UserId } })

      // console.log(receivingUserFound)

      const user = {
        name: receivingUserFound.name,
        key: key
      }

      res.render('milt/pix/confirmarPagamento', { layout: 'miltHome', user, amountUser })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async pixPay(req, res) {
    try {
      const key = req.body.key

      const accountFound = await Data.findOne({ where: { pix: key } })

      if (!accountFound) {
        return badRequest(req, res, 'Chave não encontrada!', 'messageErrorPixPay', 'milt/pix/pagar', { layout: 'miltHome' })
      }

      if (!accountFound.UserId) {
        return badRequest(res, res, 'Erro: Não foi possível obter informações do usuário.', 'messageErrorPixPay', 'milt/pix/pagar', { layout: 'miltHome' })
      }

      res.redirect(`/milt/pix/confirmarPagamento?key=${key}`)
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async confirmPaymentPost(req, res) {
    try {
      const amount = req.body.amount
      const key = req.body.key
      const userId = req.session.userid

      // Usuario pagador
      const payingUser = await User.findOne({ where: { id: userId } })

      // Dados do usuario que irá pagar
      const payingUserData = await Data.findOne({ where: { UserId: userId } })

      // Checar se possui saldo
      if (parseFloat(amount.replace(',', '.')) > payingUserData.amount) {
        return res.redirect(`/milt/pix/confirmarPagamento?key=${key}`)
      }

      if (amount == '00,00' || parseFloat(amount.replace(',', '.')) == 0) {
        return res.redirect(`/milt/pix/confirmarPagamento?key=${key}`)
      }

      res.redirect(`/milt/pix/revisao?key=${key}&amount=${amount}`)
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async revision(req, res) {
    try {
      const amountToPay = req.query.amount
      const key = req.query.key

      // Dados do usuario que irá receber
      const recipientUserData = await Data.findOne({ where: { pix: key }, raw: true })

      const receivingUserFound = await User.findOne({ where: { id: recipientUserData.UserId } })

      // ID DO USUARIO LOGADO
      const userId = req.session.userid

      // Usuario pagador
      const payingUser = await User.findOne({ where: { id: userId } })

      // Dados do usuario que irá pagar
      const payingUserData = await Data.findOne({ where: { UserId: userId } })

      // Criar uma função para ocultar parcialmente o CPF
      function ocultarCPF(cpf) {
        const partes = cpf.split('.')
        partes[0] = '***'
        partes[1] = '***'
        return partes.join('.')
      }

      const cpfReceiver = receivingUserFound.cpf

      // Aplicar a função para ocultar parcialmente o CPF
      const cpfReceiverOculto = ocultarCPF(cpfReceiver)

      const userReceiver = {
        name: receivingUserFound.name,
        cpf: cpfReceiverOculto,
        key
      }
      const cpfPayer = payingUser.cpf

      const cpfPayerOculto = ocultarCPF(cpfPayer)

      const userPayer = {
        name: payingUser.name,
        cpf: cpfPayerOculto,
        amount: payingUserData.amount.replace('.', ',')
      }

      res.render('milt/pix/revisao', { layout: 'miltHome', amountToPay, userReceiver, userPayer })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static concludedPay(req, res) {
    res.render('milt/pix/concluido', { layout: 'miltHome' })
  }

  static async revisionPost(req, res) {
    try {
      const amountToPay = parseFloat(req.body.amount.replace(',', '.'))
      const key = req.body.key

      // Dados do usuario que irá receber
      const recipientUserData = await Data.findOne({ where: { pix: key }, raw: true })

      const receivingUserFound = await User.findOne({ where: { id: recipientUserData.UserId } })

      // ID DO USUARIO LOGADO
      const userId = req.session.userid

      // Usuario pagador
      const payingUser = await User.findOne({ where: { id: userId } })

      // Dados do usuario que irá pagar
      const payingUserData = await Data.findOne({ where: { UserId: userId } })

      // Checar se possui saldo
      if (amountToPay > payingUserData.amount) {
        console.log(amount)
        return res.redirect(`/milt/pix/confirmarPagamento?key=${key}`)
      }

      const newRecipientAmount = parseFloat(recipientUserData.amount) + parseFloat(amountToPay)
      const newPayerAmount = parseFloat(payingUserData.amount) - parseFloat(amountToPay)

      console.log(newRecipientAmount)
      console.log(newPayerAmount)

      await Data.update({ amount: newPayerAmount }, { where: { id: userId } })
      await Data.update({ amount: newRecipientAmount }, { where: { UserId: receivingUserFound.id } })

      // Gerar comprovante !!

      res.redirect('/milt/pix/concluido')
      console.log('PAGAMENTO FEITO')
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  // Posso adotar a uma unica rota e classifica-la ou fazer rotas para cada tipo
  static async tranference(req, res) {

  }

}
