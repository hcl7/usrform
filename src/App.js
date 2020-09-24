import React from "react";
import LoginForm from './Components/LoginForm';
import Articles from "./Components/Articles";
import SignupForm from "./Components/SignupForm";
import ArticleView from './Views/ArticleView';
import Users from './Components/Users';
import UserView from './Views/UserView';
import Tags from './Components/Tags';
import Navigation from './Views/Navigation';
import TagView from './Views/TagView';
import UserEdit from './Views/UserEdit';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <Router>
                <main>
                    <div className="container">
                    <Navigation />
                    </div>
                    <Switch>
                        <Route path='/articles' exact component={Articles} />
                        <Route path='/articles/view/:id' component={ArticleView} />
                        <Route path="/signup" component={SignupForm} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/users' exact component={Users} />
                        <Route path='/users/view/:id' component={UserView} />
                        <Route path='/users/edit/:id' component={UserEdit} />
                        <Route path='/tags' exact component={Tags} />
                        <Route path='/tags/view/:id' component={TagView} />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;