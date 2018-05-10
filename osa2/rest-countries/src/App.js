import React, { Component } from 'react'
import axios from 'axios'


const CountryList = (props) => {
  
  const selectCountry = (event) => {
    props.setFilter(event.target.textContent)
  }

  if (props.state.validFilter) {
    if (props.state.filteredCountries.length === 1) {
      const country = props.state.filteredCountries[0]
      return (
        <div>
          <h1>{country.name} - {country.nativeName}</h1>
          <h3>Capital: {country.capital}</h3>
          <h3>Population: {country.population}</h3>
          <img width='400px' border='1' src={country.flag} alt='flag' />
        </div>
      )
    } else {
      return (
        <table>
          <tbody>
            {props.state.filteredCountries.map(country => 
              <tr key={country.name} onClick={selectCountry} style={{cursor: 'pointer'}}>
                <td>{country.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      )
    }
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: "",
      validFilter: false
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ allCountries: response.data })
      })
  }
  
  findCountries = (event) => {
    let f = ""
    let filtered = []
    if (typeof event === "string") {
      f = event
      filtered = this.state.allCountries.filter(country => country.name === f)
    } else {
      f = event.target.value
      filtered = this.state.allCountries.filter(country => country.name.toLowerCase().indexOf(f.toLowerCase()) !== -1)
    }
    
    this.setState({ filter: f })
    if (filtered.length > 10) {
      this.setState({ validFilter: false })
    } else {
      this.setState({ validFilter: true, filteredCountries: filtered })
    }
    
  }

  setFilter = (f) => {
    this.setState({ filter: f })
    this.findCountries(f)
  }

  render() {
    return (
      <div>
        <div>Find countries: <input value={this.state.filter} onChange={this.findCountries} /></div>
        <CountryList state={this.state} setFilter={this.setFilter}/>
      </div>
    )
  }
}

export default App
