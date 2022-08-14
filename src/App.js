import { useState } from 'react';
import './App.css';
import Dice from './Dice';
import { nanoid } from 'nanoid'

function App() {
  const [numberArr, setNumberArr] = useState(() => generateDices());
  const [resetGame, setResetGame] = useState(() => false);
  
  function generateDices() {
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

  function generateDicesForUnSelected() {
    const newDices = [...numberArr];
    return newDices.map(item => {
      if(!item.isSelected) {
        item.diceNum = Math.ceil(Math.random() * 6);
      }
      return item;
    });
  }

  const handleRoll = () => {
    if([...numberArr].every(item => item.isSelected === true)) {
      setResetGame(prevValue => !prevValue);
      setNumberArr(generateDices());
    } else {
      setNumberArr(generateDicesForUnSelected());
    }
  }

  const handleDiceSelect = (id) => {
    setNumberArr(prevValue => prevValue.map(item => {
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
    <div className="App">
      <h2>Tenzies</h2>
      <article>
        Roll until message here
      </article>

      <section className='dice-section'>
        {
          numberArr.length && numberArr.map(item => <Dice key={item.id} item={item} on={handleDiceSelect}/>)
        }
      </section>
      <div>
        <button type='button' onClick={handleRoll}>{ resetGame ? 'Reset' : 'Roll'}</button>
      </div>
    </div>
  );
}

export default App;
