import React from 'react';
import PropTypes from 'prop-types';
import './Key.css';
const Key = ({keyValue,keyAction,keyType}) => {
    return ( 
        <div className={`key-container ${keyType}`}
        onClick={()=>keyAction(keyValue)}>
<p className="key-value">
{keyValue}
</p>
        </div>
     );
}
Key.propTypes={
    keyValue:PropTypes.string.isRequired,
    keyType:PropTypes.string.isRequired,
    keyAction:PropTypes.func.isRequired
}

export default Key;