const User = require("../models/Users")
const Data = require("../models/Data")

module.exports = class HomeController {
  static async home(req, res) {
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

    console.log(amount)
    res.render('milt/home', { layout: 'miltHome', username, amount })
  }
}