import React from 'react';
import ValidationMessage from './ValidationMessage';

const textInput = (props) => (
    <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <ValidationMessage 
            valid={props.inputValid} 
            message={props.errorMsg}    
        />
        <input className="form-control"
            type={props.inputType} 
            id={props.id} 
            name={props.name} 
            value={props.inputValue} 
            onChange={props.changed} 
        />
    </div>
);

export default textInput;