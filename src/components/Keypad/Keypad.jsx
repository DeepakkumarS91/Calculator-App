import React from 'react';
import PropTypes from 'prop-types';
import Key from '../Key/Key';
import './Keypad.css';

const Keypad = ({numbers,operators,setOperator,callOperator,updateDisplay}) => {

    const numberKeys=numbers.map(number=><Key key={number} 
    keyValue={number}
    keyType='number-key'
    keyAction={updateDisplay}
    />);
    const operatorKeys=operators.map(operator=><Key key={operator}
    keyValue={operator}
    keyType='operator-key'
    keyAction={setOperator}
    />)
    return ( 
        <div className='keypad-container'>
            <div className="numbers-container">
                {numberKeys}
                </div>
                <div className='operators-container'>
                    {operatorKeys}
                    </div>
                    <div className="submit-container">
                    <Key
                    keyAction={callOperator}
                    keyValue='='
                    keyType='submit-key'
                    /></div>
        </div>
     );
}

Keypad.propTypes={
numbers:PropTypes.array.isRequired,
operators:PropTypes.array.isRequired,
setOperator:PropTypes.func.isRequired,
callOperator:PropTypes.func.isRequired,
updateDisplay:PropTypes.func.isRequired
}

export default Keypad;