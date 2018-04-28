import React from 'react'

const Otsikko = (props) => {
    return (
      <h2>{props.kurssi.nimi}</h2>
      )
  }
  
  const Osa = (props) => {
    return (
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
  }
  
  const Sisalto = (props) => {
    return (
      <div>{props.kurssi.osat.map(osa => <Osa osa={osa} key={osa.id} />)}</div>
    )
  }
  
  const Yhteensa = (props) => {
    return (
      <p>Yhteensä {props.kurssi.osat.reduce((yhteensa, osa) => yhteensa + osa.tehtavia, 0)} tehtävää</p>
    )
  }
  
  const Kurssi = (props) => {
    return (
      <div>
        <Otsikko kurssi={props.kurssi} />
        <Sisalto kurssi={props.kurssi} />
        <Yhteensa kurssi={props.kurssi} />
      </div>
    )
  }

  export default Kurssi