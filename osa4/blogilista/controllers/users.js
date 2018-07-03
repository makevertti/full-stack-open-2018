const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  response.json(
    await User
      .find({}, {__v: 0, passwordHash: 0})
      .populate('blogs', { user: 0, __v: 0 }))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password.length < 3) return response.status(422).json({error: 'password must be at least 3 characters long'})
    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) return response.status(422).json({error: 'username must be unique'})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const adult = body.adult === undefined ? true : body.adult

    const user = new User({
      username: body.username,
      passwordHash: passwordHash,
      name: body.name,
      adult: adult
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter