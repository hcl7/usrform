import React from 'react';
import ValidationMessage from './ValidationMessage';

const textInput = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className="form-control"
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className="form-control"
                type={props.type}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className="form-control"
                    value={props.value}
                    onChange={props.changed}>
                    {props.options.map((option, key) => (
                        <option key={key} value={option.title}>{option.title}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className="form-control"
                value={props.value}
                onChange={props.changed}
            />;
    }
    return (
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <ValidationMessage
                valid={props.valid}
                message={props.message ? props.message : null}
            />
            {inputElement}
        </div>
    );
}

export default textInput;