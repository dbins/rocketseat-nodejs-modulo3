const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    // const ads = await Ad.find()
    // Se fizer Ad.populate('author').find() vai trazer junto as informacoes do user

    const filters = {}
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}
      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }
    if (req.query.tile) {
      filters.title = new RegExp(req.query.title, i) // Case insensitive
    }
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt' // O menos significa que o campo sera ordenado DESC
    })
    return res.json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id)
    return res.json(ad)
  }

  async store (req, res) {
    // throw new Error()
    const ad = await Ad.create({ ...req.body, author: req.userID }) // Tudo o que esta no body + o author que esta na sessão
    return res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    return res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)
    return res.send()
  }
}
module.exports = new AdController()
