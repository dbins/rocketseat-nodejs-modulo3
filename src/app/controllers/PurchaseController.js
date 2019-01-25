const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad)
    const user = await User.findById(req.userID)
    // Movido para o arquivo de jobs
    // await Mail.sendMail({
    //  from: '"Diego Fernandes"<diego@rocketseat.com.br>',
    //  to: 'bins.br@gmail.com', // purchaseAd.author.email
    //  subject: 'Solicitação de compra: ' + purchaseAd.title,
    //  template: 'purchase',
    //  context: { user, content, ad: purchaseAd }
    // })

    Queue.create(PurchaseMail.key, { ad: purchaseAd, user, content }).save()

    return res.send()
  }
}
module.exports = new PurchaseController()
