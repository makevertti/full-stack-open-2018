import React from 'react'

import personService from './services/persons'

import AddNewPersonForm from './components/AddNewPersonForm'
import Filtering from './components/Filtering'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  showNotification = (message) => {
    this.setState({notification: message})
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000)
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.filter(person => (person.name === this.state.newName)).length > 0) {
      if (window.confirm(this.state.newName + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
        const personObject = {name: this.state.newName, number: this.state.newNumber};
        const updateablePersonId = this.state.persons.filter(person => (person.name === this.state.newName))[0].id
        personService
        .update(updateablePersonId, personObject)
        .then(updatedPerson => {
          let updatedPersons = this.state.persons;
          updatedPersons.forEach(person => {
            if (person.id === updateablePersonId) {
              person.number = this.state.newNumber
            }
          })
          this.showNotification('Päivitettiin ' + this.state.newName)
          this.setState({persons: updatedPersons, newName: '', newNumber: '' })
        })
        .catch(error => {
          this.setState({ persons: this.state.persons.filter(person => person.id !== updateablePersonId) })
          this.addPerson(event)
        })
      }
    } else {
      const personObject = {name: this.state.newName, number: this.state.newNumber};
      personService
      .create(personObject)
      .then(newPerson => {
        this.showNotification('Lisättiin ' + this.state.newName)
        this.setState({ persons: this.state.persons.concat(newPerson), newName: '', newNumber: '' })
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }

  deletePerson(event) {
    const deletablePersonName = this.state.persons.filter(person => person.id === event.target.id)[0].name
    if (window.confirm('Poistetaanko ' + deletablePersonName + '?')) {
      let newPersonArray = this.state.persons.filter(person => person.id !== event.target.id)
      personService
      .remove(event.target.id)
      .then(() => {
        this.setState({persons: newPersonArray})
        this.showNotification('Poistettiin ' + deletablePersonName)
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.notification} />
        <Filtering filter={this.state.filter} handleFilterChange={this.handleFilterChange} />

        <h2>Lisää uusi</h2>
        <AddNewPersonForm onSubmit={this.addPerson} 
                          handleNameChange={this.handleNameChange} 
                          handleNumberChange={this.handleNumberChange} 
                          persons={this.state.persons} 
                          newName={this.state.newName} 
                          newNumber={this.state.newNumber} />
        
        <h2>Numerot</h2>
        <PersonList persons={this.state.persons} filter={this.state.filter} deleteFunction={this.deletePerson.bind(this)} />
      </div>
    )
  }
}

export default App