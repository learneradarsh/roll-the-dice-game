import { useEffect, useState } from 'react';
import './App.css';
import Dice from './Dice';
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(() => initDice());
  const [resetGame, setResetGame] = useState(() => false);
  const [luckyNumber, setLuckyNumber] = useState(() => initLuckyNumber());

  useEffect(() => {
    if([...dice].every(item => item.isSelected === true)) {
      setResetGame(true);
    }
  }, [dice])

  function initLuckyNumber() {
    return Math.ceil(Math.random() * 6);
  }
  
  function initDice() {
    const newDices = [];
    for(let i=0; i<10; i++) {
      newDices.push({
        id: nanoid(),
        diceNum: Math.ceil(Math.random() * 6),
        isSelected: false
      });
    }
    return newDices;
  }

  function rollDiceForUnSelected() {
    const newDices = [...dice];
    return newDices.map(item => {
      if(!item.isSelected) {
        item.diceNum = Math.ceil(Math.random() * 6);
      }
      return item;
    });
  }

  function handleResetGame() {
    setDice(initDice());
    setLuckyNumber(initLuckyNumber());
    setResetGame(false);
  }

  const handleDiceRoll = () => {
    setDice(rollDiceForUnSelected());
  }

  const handleDiceSelect = (id) => {
    setDice(prevValue => prevValue.map(item => {
      if(item.id === id) {
        item = {
          ...item,
          isSelected: !item.isSelected
        }
      }
      return item;
    }));
  }

  return (
    <div className="app-container">
      <h2>Roll The Dice</h2>
      {
        resetGame &&
        <strong>You win the game!!</strong>
      }
      <article>
        Roll until you get your lucky number <strong>{luckyNumber}</strong>
      </article>

      <section className='dice-section'>
        {
          dice.length && dice.map(item => <Dice key={item.id} item={item} on={handleDiceSelect}/>)
        }
      </section>
      <div className='btn-container'>
        {
          !resetGame ? 
          <button className='btn roll-btn' type='button' onClick={handleDiceRoll}>Roll</button> :
          <button className='btn reset-btn' type='button' onClick={handleResetGame}>Reset</button>
        }
        
      </div>
    </div>
  );
}

export default App;
