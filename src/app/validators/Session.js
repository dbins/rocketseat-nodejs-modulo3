const Joi = require('joi')
module.exports = {
  // Pode ser tambem query ou params para validar outros tipos de entradas
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
}
