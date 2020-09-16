import React from 'react';

const smartList = (props) => (
    <div className="container">   
        <table className="table table-bordered">
            <thead>
            <tr>
                {props.smartListHeaders && Array.isArray(props.smartListHeaders) && props.smartListHeaders.map((slh, i) => (
                    <th key={i}>{slh.label}</th>
                ))}
                <th>Actions</th>
            </tr>
            
            </thead>
            <tbody>
                {props.smartListContents && Array.isArray(props.smartListContents) && props.smartListContents.map((slc, i) => 
                    <tr key={i}>
                        {Object.keys(slc).map((key, i) => 
                            key!==props.id ? <td key={i}>{slc[key]}</td> : null
                        )}
                        <td><a href={props.view+'/'+slc[props.id]}>View</a>|
                            <a href={props.edit+'/'+slc[props.id]}>Edit</a>|
                            <a href={props.delete+'/'+slc[props.id]}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default smartList;