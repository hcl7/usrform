import React from 'react';

const header = (props) => (
    <div className="container">
        <h1 style={{textAlign: 'center'}}>{props.header}</h1>
    </div>
);

export default header;