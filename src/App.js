import React from "react";
import LoginForm from './Components/LoginForm';
import ArticleView from "./Components/ArticleView";
import SignupForm from "./Components/SignupForm";
import Users from './Views/Users';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
        <Router>
            <main>
            <div className="container">
            </div>
            <Switch>
                <Route path="/articles" exact component={ArticleView} />
                <Route path="/signup" component={SignupForm} />
                <Route path='/login' component={LoginForm} />
                <Route path='/articles/view/:id' component={Users} />
            </Switch>
            </main>
        </Router>
        );
    }
  }

  export default App;