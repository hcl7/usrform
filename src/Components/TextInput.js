import React from 'react';
import ValidationMessage from './ValidationMessage';

const textInput = (props) => (
    <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <ValidationMessage 
            valid={props.inputValid ? props.inputValid : null} 
            message={props.errorMsg ? props.errorMsg : null}    
        />
        <input className="form-control"
            type={props.inputType} 
            id={props.id} 
            name={props.name} 
            value={props.inputValue} 
            onChange={props.changed}
            disabled={props.disabled}
        />
    </div>
);

export default textInput;