const mongoose = require('mongoose')
const fs = require('fs')

const dbCredentials = JSON.parse(fs.readFileSync('../../ignore/osa3/db-credentials.json', 'utf8'));
const url = 'mongodb://' + dbCredentials.username + ':' + dbCredentials.password + '@ds257590.mlab.com:57590/full-stack-open-puhelinluettelo'
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = function (person) {
  return {
    id: person._id,
    name: person.name,
    number: person.number
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person