const mongoose = require('mongoose')
const fs = require('fs');

const dbCredentials = JSON.parse(fs.readFileSync('../../ignore/osa3/db-credentials.json', 'utf8'));
const url = 'mongodb://' + dbCredentials.username + ':' + dbCredentials.password + '@ds257590.mlab.com:57590/full-stack-open-puhelinluettelo'

mongoose.connect(url)

const name = process.argv[2]
const number = process.argv[3]

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (name === undefined && number === undefined) {
  Person
  .find({})
  .then(result => {
    console.log('Puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(response => {
      console.log('Lisätään henkilö ' + name + ' numero ' + number + ' luetteloon')
      mongoose.connection.close()
    })
}
