import React from 'react';
import { Link } from 'react-router-dom';

const sidebar = (props) => (
    <div className="container-sm">
	    <nav className="navbar">
           	<ul className="navbar-nav nav-tabs">
                {props.sideList && Array.isArray(props.sideList) && props.sideList.map(sl =>(
                    <li key={sl.id} className="btn btn-outline-info btn-sm"><Link className="nav-link" to={sl.link}>{sl.label}</Link></li>
                ))}
                
            </ul>
        </nav>
    </div>
);

export default sidebar;