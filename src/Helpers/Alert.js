import React from 'react';

const alert = (props) => {
    return (
        <div className={"alert alert-" + props.mode} role="alert">{props.msg}</div>
    );
}
export default alert;