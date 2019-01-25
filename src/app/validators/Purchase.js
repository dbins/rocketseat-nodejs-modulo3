const Joi = require('joi')
module.exports = {
  // Pode ser tambem query ou params para validar outros tipos de entradas
  body: {
    add: Joi.string().required(),
    content: Joi.string().required()
  }
}
