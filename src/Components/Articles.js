import React, { Component } from 'react';
import Header from './Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import { sideList, slArticlesHeaders, formatDate } from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';
import Alert from '../Helpers/Alert';
import Spinner from '../Helpers/Spinner';

class Articles extends Component {

    state = {
        articles: [],
        loading: true
    }

    loadArticlesHandler = () => {
        const self = this;
        axios.get('/articles')
            .then(function (response) {
                const articles = response.data;
                const updateArticles = articles.map(article => {
                    console.log('articles: ', article);
                    article.created = formatDate(article.created);
                    return {
                        ...article
                    }
                });
                self.setState({ articles: updateArticles, loading: false });
            })
            .catch(function (error) {
                console.log('Get ArticleView Error: ' + error.message);
            })
            .finally(function () {

            }
            );
    }

    componentDidMount() {
        this.loadArticlesHandler();
    }

    render() {
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />
        } else {
            spinner = (
                <SmartList
                    smartListHeaders={slArticlesHeaders}
                    smartListContents={this.state.articles}
                    view={'/articles/view'}
                    edit={'/articles/edit'}
                    delete={'/articles/delete'}
                    where="id"
                />
            );
        }
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header="Articles" />
                        {this.props.location.statusMessage ? <Alert mode="success" msg={this.props.location.statusMessage} /> : null}
                        {spinner}
                    </div>
                </div>
            </div>
        );
    }
}

export default Articles;