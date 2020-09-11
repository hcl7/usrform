import React from "react";
import LoginForm from './Components/LoginForm';
import ArticleView from "./Components/ArticleView";
import SignupForm from "./Components/SignupForm";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
        <Router>
            <main>
            <div className="container">
            <ul className="nav">
                <li className="nav-item"><Link className="nav-link" to="/articles/indexAPI">Articles</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">SignUp</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            </ul>
            </div>
            <Route path="/articles/indexAPI" component={ArticleView} />
            <Route path="/signup" component={SignupForm} />
            <Route path='/login' component={LoginForm} />
            </main>
        </Router>
        );
    }
  }

  export default App;