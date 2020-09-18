import React from 'react';
import { NavLink } from 'react-router-dom';

const smartList = (props) => (
    <table className="table table-bordered">
        <thead>
            <tr>
                {props.smartListHeaders && Array.isArray(props.smartListHeaders) && props.smartListHeaders.map(slh => (
                    <th key={slh.key}>{slh.label}</th>
                ))}
                <th>Actions</th>
            </tr>

        </thead>
        <tbody>
            {props.smartListContents && Array.isArray(props.smartListContents) && props.smartListContents.map((slc, i) =>
                <tr key={i}>
                    {Object.keys(slc).map((key, i) => (
                        props.smartListHeaders.some(header => header.key === key) ? <td key={i}>{slc[key]}</td> : null
                    ))}
                    <td>
                        <NavLink to={props.view + '/' + slc[props.id]}>View</NavLink>|
                        <NavLink to={props.edit + '/' + slc[props.id]}>Edit</NavLink>|
                        <NavLink to={props.delete + '/' + slc[props.id]}>Delete</NavLink>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
);

export default smartList;