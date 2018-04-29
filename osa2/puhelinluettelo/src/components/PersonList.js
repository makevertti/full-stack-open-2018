import React from 'react'
import Person from './Person'

const PersonList = (props) => {
  return (
    <table>
      <tbody>
        {props.persons.filter(person => (person.name.toLowerCase().includes(props.filter.toLowerCase()))).map(person => 
        <Person key={person.name} name={person.name} number={person.number} />)}
      </tbody>
    </table>
  )
}

export default PersonList