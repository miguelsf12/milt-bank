const User = require('../models/Users')
const Data = require('../models/Data')

module.exports = class TransferController {
  static registerKey(req, res) {
    res.render('milt/pix/registerKey', { layout: 'miltHome' })
  }

  static async registerKeyPost(req, res) {
    const keyPix = req.body.pix
    const userId = req.session.userid

    try {
      await Data.update({ pix: keyPix }, { where: { UserId: userId } });
      res.redirect('/milt/pix')
    } catch (error) {
      console.log(error)
    }
  }

  static pay(req, res) {
    res.render('milt/pix/pagar', { layout: 'miltHome' })
  }

  // Posso adotar a uma unica rota e classifica-la ou fazer rotas para cada tipo
  static async tranference(req, res) {

  }

}
