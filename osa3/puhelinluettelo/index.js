const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('frontend-build'))

morgan.token('data', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :data :res[content-length] - :response-time ms'))


app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(result => {
      res.json(result.map(Person.format))
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(result => {
      res.json(Person.format(result))
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'invalid id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'invalid id' })
    })
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  if (!person.name || !person.number) {
    return res.status(400).json({ error: 'Name and number required' })
  }

  Person
    .find({ name: person.name })
    .then(result => {
      if (result.length > 0) {
        res.status(400).json({ error: 'Name already exists' })
      } else {
        const dbPerson = new Person({
          name: person.name,
          number: person.number
        })

        dbPerson
          .save()
          .then(result => {
            res.json(Person.format(result))
          })
          .catch(err => {
            console.log(err)
            res.status(404).end()
          })
      }
    })
})

app.put('/api/persons/:id', (req, res) => {
  const p = req.body

  const person = {
    name: p.name,
    number: p.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true } )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'invalid id' })
    })

})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(result => {
      res.send('<p>Puhelinluettelossa on ' + result.length + ' henkilön tiedot</p><h3>' + new Date +'</h3>')
    })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})