import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button>

const Statistic = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const AnecdoteStatistic = ({text, value}) => {
  return (
    <table>
      <tbody>
        <Statistic text={text} value={value}/>
      </tbody>
    </table>
  )
}


const Statistics = ({good, bad, neutral}) => {
  
  let all =  good + bad + neutral
  let avg = (good - bad) / all
  let positive = (good) / all

  if (good === 0 && bad === 0 && neutral === 0){
    return (
    <p>No feedback given</p>
    )
  }
  else {
    return(
    <div>
      <table>
        <tbody>
        <Statistic text="good" value ={good}/>
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={avg}/>
        <Statistic text="positive" value={positive}/>
        </tbody>
      </table>

    </div>
    )
  }
}

const Anecdote = ({text}) => {
  return (
  <p>{text}</p>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(10 + 1).join('0').split('').map(parseFloat))
  const [topAnecdote, setTopAnecdote] = useState(0)

  const handleClick = (val) => () => {
    if (val === 0){
      setGood(good + 1)
    }
    else if (val === 1){
      setNeutral(neutral + 1)
    }
    else if (val === 2){
      setBad(bad + 1)
    }
  }

  const handleVote = () => () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    selectTopAnecdote(copy)
  }

  const giveAnecdote = () => () => {
    let rand = Math.floor((Math.random() * (props.anecdotes.length)));

    return setSelected(rand);
  }

  const selectTopAnecdote = (copy) => {
    let idx = 0
    let max = 0
    for(let i = 0; i < copy.length; i++) {
      if (max < copy[i]){
        max = copy[i]
        idx = i
      }
    }
    
    setTopAnecdote(idx)
  }

  return (
    <div>
      {/* Anecdotes */}
      <Header text ="Anecdote of the day"/>
      <Anecdote text={props.anecdotes[selected]}/>
      <AnecdoteStatistic text="current votes" value={points[selected]}/>
      <Button onclick={giveAnecdote()} text="click for next anecdote"/>
      <Button onclick={handleVote()} text="vote"/>

      <Header text="Anecdote with most votes"/>
      <Anecdote text={props.anecdotes[topAnecdote]}/>
      <p>Has {points[topAnecdote]} votes</p>

      {/* Feedback */}
      <Header text="give feedback"/>
      <Button onclick={handleClick(0)} text="good"/>
      <Button onclick={handleClick(1)} text="neutral"/>
      <Button onclick={handleClick(2)} text="bad"/> 

      {/* Statistics */}
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
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
// ReactDOM.render(<App />,
//   document.getElementById('root')
// )