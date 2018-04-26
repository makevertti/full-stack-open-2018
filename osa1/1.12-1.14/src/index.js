import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0],
      mostVoted: 0
    }
  }

  nextAnecdote = () => {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * anecdotes.length) })
    }
  }

  updateMostVotedAnecdote = () => {
    let mostVoted = 0;
    let votes = 0;

    this.state.votes.forEach((value, i) => {
      if (value > votes) {
        mostVoted = i
        votes = value
      }
    })
    this.setState({ mostVoted: mostVoted })
  }

  updateMostVotedAnecdote = () => {
    let mostVoted = 0;
    let votes = 0;

    this.state.votes.forEach((value, i) => {
      if (value > votes) {
        mostVoted = i
        votes = value
      }
    })
    this.setState({ mostVoted: mostVoted })
  }

  voteAnecdote = () => {
    return () => {
      const votesTemp = [...this.state.votes]
      votesTemp[this.state.selected] += 1

      this.setState({ 
        votes: votesTemp }, 
        () => this.updateMostVotedAnecdote()
      )
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.anecdotes[this.state.selected]}</h3>

        <div>Has {this.state.votes[this.state.selected]} votes</div>
        <button onClick={this.voteAnecdote()}>Vote</button>
        <button onClick={this.nextAnecdote()}>Next anecdote</button>

        <h2>Anecdote with most votes:</h2>
        <h3>{anecdotes[this.state.mostVoted]}</h3>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)