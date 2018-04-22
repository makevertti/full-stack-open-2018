import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Button = (props) => {
  return (
    <button onClick = {props.onClick}>{props.name}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const calculateAverage = () => {
    return parseFloat(((props.state.good - props.state.bad) / (props.state.good + props.state.neutral + props.state.bad)).toFixed(1));
  }

  const calculatePositivePercentage = () => {
    return parseFloat((props.state.good / (props.state.good + props.state.neutral + props.state.bad) * 100).toFixed(1));
  }

  if (props.state.good === 0 && props.state.neutral === 0 && props.state.bad === 0) {
    return (
      <div>
        <h1>Statistiikka</h1>
        <div>Palautetta ei annettu</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Statistiikka</h1>
        <table>
          <tbody>
            <Statistic name = "hyvä" value = {props.state.good} />
            <Statistic name = "neutraali" value = {props.state.neutral} />
            <Statistic name = "huono" value = {props.state.bad} />
            <Statistic name = "keskiarvo" value = {calculateAverage()} />
            <Statistic name = "positiivisia" value = {calculatePositivePercentage() + " %"} />
          </tbody>
        </table>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  }

  addFeedback = (category) => {
    return () => {
      this.setState({[category]: this.state[category] + 1})
    }
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button name = "hyvä" onClick = {this.addFeedback("good")}/>
        <Button name = "neutraali" onClick = {this.addFeedback("neutral")}/>
        <Button name = "huono" onClick = {this.addFeedback("bad")}/>

        <Statistics state = {this.state} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
