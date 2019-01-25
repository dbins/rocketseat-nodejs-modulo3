const Joi = require('joi')
module.exports = {
  // Pode ser tambem query ou params para validar outros tipos de entradas
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
  }
}
