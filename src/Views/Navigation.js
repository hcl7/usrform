import React from 'react';
import { NavLink } from 'react-router-dom';

const navigation = (props) => (
    <nav className="navbar navbar-expand-sm bg-light fixed-top">
        <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/articles">Articles</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/signup">SignUp</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tags">Tags</NavLink></li>
        </ul>
    </nav>
);

export default navigation;