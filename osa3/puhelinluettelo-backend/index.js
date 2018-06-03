const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

let persons = [
  {
    name: "Testi1",
    number: "123456789",
    id: 1
  },
  {
    name: "Testi2",
    number: "987654321",
    id: 2
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === Number(req.params.id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))
  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const person = req.body

  if (!person.name || !person.number) {
    return res.status(400).json({error: 'Name and number required'})
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({error: 'Name must be unique'})
  }

  person.id = Math.floor(Math.random() * 1000000)
  persons = persons.concat(person)
  res.json(person)
})

app.get('/info', (req, res) => {
  res.send('<p>Puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p><h3>' + new Date +'</h3>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})