import React from 'react';

const sidebar = (props) => (
    <div className="container-sm border">
	    <nav className="navbar">
           	<ul className="navbar-nav nav-tabs">
                {props.sideList && Array.isArray(props.sideList) && props.sideList.map(sl =>(
                    <li key={sl.id} className="nav-item"><a className="nav-link" href={sl.link}>{sl.label}</a></li>
                ))}
                
            </ul>
        </nav>
    </div>
);

export default sidebar;