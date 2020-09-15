import React from 'react';
import ValidationMessage from './ValidationMessage';

const testInput = (props) => (
    <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <ValidationMessage 
            valid={props.inputValid} 
            message={props.errorMsg}    
        />
        <input type={props.inputType} id={props.id} name={props.name} className="form-control"
        value={props.inputValue} onChange={props.changed} />
    </div>
);

export default testInput;