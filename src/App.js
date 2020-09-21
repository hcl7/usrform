import React from "react";
import LoginForm from './Components/LoginForm';
import ArticleView from "./Components/ArticleView";
import SignupForm from "./Components/SignupForm";
import Article from './Views/Article';
import Users from './Views/Users';
import UserView from './Views/UserView';

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
                <Route path='/articles/view/:id' component={Article} />
                <Route path='/users/' component={Users} />
                <Route path='/users/view/:id' component={UserView} />
            </Switch>
            </main>
        </Router>
        );
    }
  }

  export default App;