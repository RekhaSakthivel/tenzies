import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value) ? true : false;

  function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
            value:Math.ceil(Math.random() * 6),
             isHeld:false,
              id: nanoid() 
          })
      )
  }

  function hold(id) {
    setDice(oldDice => (oldDice.map(die => 
      die.id === id ?
        {...die, isHeld: !die.isHeld} : die
      )
    ))
  }

  const dieElements = dice.map((die)=> 
    <Die key={die.id} number={die.value} isHeld={die.isHeld} hold={() => hold(die.id)} id={die.id}></Die>
  );

  function rollDice(){
    if(!gameWon){
      setDice(oldDice => (oldDice.map(die => 
      die.isHeld ? die : {...die, value:Math.ceil(Math.random() * 6) } 
    )));
    }else{
      setDice(generateAllNewDice())
    }
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dieElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{gameWon ? 'New game' : 'Roll'}</button>
    </main>
  )
}

export default App
