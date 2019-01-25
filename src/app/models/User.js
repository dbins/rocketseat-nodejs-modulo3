const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const UserSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Arrow function nao tem o this, usar funcao normal para pegar informacoes da classe atual
UserSChema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

UserSChema.methods = {
  compareHash (password) {
    // Recebe senha sem criptografia e compara com senha criptografada
    return bcrypt.compare(password, this.password)
  }
}
// Metodos estaticos pode usar sem instanciar classe
UserSChema.statics = {
  // Pega apenas o id do objeto user enviado como parametro
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.ttl })
  }
}

module.exports = mongoose.model('User', UserSChema)
