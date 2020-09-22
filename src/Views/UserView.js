import React, { Component } from 'react';
import axios from '../hoc/axios-baseurl';
import Navigation from './Navigation';
import SideBar from '../Views/Sidebar';
import Header from '../Components/Header';
import { sideList, formatDate, slArticlesHeaders } from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';


class UserView extends Component {
    state = {
        user: [],
        articles: []
    }

    loadUserHandler = (id) => {
        const self = this;
        axios.get('/users/view/' + id)
            .then(function (response) {
                const user = response.data
                console.log("User: ", user);
                self.setState({ user: user });
                const articles = user.articles;
                const changeArticles = articles.map(article => {
                    article.created = formatDate(article.created);
                    return {
                        ...article
                    }
                });
                self.setState({articles: changeArticles});
            })
            .catch(function (error) {
                console.log("Get Error User:" + error.message);
            })
            .finally(function () { });
    }

    componentDidMount() {
        console.log('User Loaded!');
        this.loadUserHandler(this.props.match.params.id);
    }

    render() {
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header="User" />
                        <div className="media border p-3">
                            <div className="media-body">
                                <p>Email:</p>
                                <p>Posted On:</p>
                                <p>ID:</p>
                            </div>
                            <div className="media-body">
                                <p><small><i>{this.state.user.email}</i></small></p>
                                <p><small><i>{formatDate(this.state.user.created)}</i></small></p>
                                <p><small><i>{this.state.user.id}</i></small></p>
                            </div>
                        </div>
                        <div className="media border p-3">
                            <SmartList
                                smartListHeaders={slArticlesHeaders}
                                smartListContents={this.state.articles}
                                view={'/articles/view'}
                                edit={'/articles/edit'}
                                delete={'/articles/delete'}
                                where="id"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserView;