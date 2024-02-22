const User = require("../models/Users")
const Data = require("../models/Data")
const { badRequest, serverError } = require('../helpers/errorHandler')

module.exports = class HomeController {
  static async home(req, res) {
    try {
      const userId = req.session.userid

      const userDb = await User.findOne({
        where: {
          id: userId,
        },
        include: Data,
        plain: true
      })

      const username = userDb.name

      const data = userDb.Datum
      const dataUser = data.dataValues
      const amount = data.dataValues.amount

      res.render('milt/home', { layout: 'miltHome', username, amount })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }

  static async pix(req, res) {
    try {
      const userId = req.session.userid
      const dataUser = await Data.findOne({ where: { UserId: userId } })

      const keyPix = dataUser.pix

      res.render('milt/pix', { layout: 'miltHome', keyPix })
    } catch (error) {
      console.log(`Houve um erro: ${error}`);
      return serverError(res);
    }
  }
}
