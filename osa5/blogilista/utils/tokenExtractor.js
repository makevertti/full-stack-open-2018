
const tokenExtractor = (request, response, next) => {
  const getToken= (req) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  request.token = getToken(request)
  next()
}

module.exports = tokenExtractor