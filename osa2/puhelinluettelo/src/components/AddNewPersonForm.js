import React from 'react'

const AddNewPersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Nimi: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        Numero: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default AddNewPersonForm