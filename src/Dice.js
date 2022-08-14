import React, {memo} from 'react';

const Dice = (props) => {
    return <button 
    type='button'
     className={props.item.isSelected ? 'dice selected': 'dice'}
       onClick={() => props.on(props.item.id)}>{props.item.diceNum}</button>
}

export default memo(Dice);