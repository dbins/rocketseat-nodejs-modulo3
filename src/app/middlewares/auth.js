const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status('401').json({ error: 'Token not provided' })
  }
  const [, token] = authHeader.split(' ') // Quebra o header num array e pega o segundo elemento (token sem o Bearer)
  try {
    // Transforma uma funcao que usa callbacks numa promisse
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userID = decoded.id // Adiciona em todas as requisicoes que utilizaram este middleware o ID do usuário
    return next() // Middleware tem sempre req, res e next
  } catch (error) {
    res.status('401').json({ error: 'Token invalid' })
  }
}
