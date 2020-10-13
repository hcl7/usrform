import React from 'react';

const modalDelete = (props) => (

    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">{props.title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={props.close}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            {props.body}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.close}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={props.clicked}>Delete</button>
        </div>
    </div>
);

export default modalDelete;