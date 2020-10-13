import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SmartList extends Component {
     render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {this.props.smartListHeaders && Array.isArray(this.props.smartListHeaders) && this.props.smartListHeaders.map(slh => (
                            <th key={slh.key}>{slh.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {this.props.smartListContents && Array.isArray(this.props.smartListContents) && this.props.smartListContents.map((slc, i) =>
                        <tr key={i}>
                            {Object.keys(slc).map((key, i) => (
                                this.props.smartListHeaders.some(header => header.key === key) ? <td key={i}>{slc[key]}</td> : null
                            ))}
                            <td>
                                <NavLink className="btn btn-outline-info" to={this.props.view + '/' + slc[this.props.where]}>View</NavLink>&nbsp;
                                <NavLink className="btn btn-outline-secondary" to={this.props.edit + '/' + slc[this.props.where]}>Edit</NavLink>&nbsp;
                                <button className="btn btn-outline-danger" onClick={(e) => this.props.clicked(slc[this.props.where])}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default SmartList;