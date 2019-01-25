const Joi = require('joi')
module.exports = {
  // Pode ser tambem query ou params para validar outros tipos de entradas
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
  }
}
