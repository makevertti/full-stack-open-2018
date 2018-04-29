import React from 'react'
import AddNewPersonForm from './components/AddNewPersonForm'
import Filtering from './components/Filtering'
import PersonList from './components/PersonList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.filter(person => (person.name === this.state.newName)).length > 0) {
      alert("Henkilö on jo lisätty")
    } else {
      const personsTemp = this.state.persons
      personsTemp.push({name: this.state.newName, number: this.state.newNumber})
      this.setState({ person: personsTemp, newName: '', newNumber: '' })
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

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Filtering filter={this.state.filter} handleFilterChange={this.handleFilterChange} />

        <h2>Lisää uusi</h2>
        <AddNewPersonForm onSubmit={this.addPerson} 
                          handleNameChange={this.handleNameChange} 
                          handleNumberChange={this.handleNumberChange} 
                          persons={this.state.persons} 
                          newName={this.state.newName} 
                          newNumber={this.state.newNumber} />
        
        <h2>Numerot</h2>
        <PersonList persons={this.state.persons} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App