import React, { Component } from 'react';
import Header from './Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import { sideList, slArticlesHeaders, formatDate } from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';
import Alert from '../Helpers/Alert';
import Spinner from '../Helpers/Spinner';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';

class Articles extends Component {
    
    state = {
        articles: [],
        loading: true
    }

    parentFunction = (d) =>{
        console.log(d);
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
        if (this.props.articleResponseMessage){
            setTimeout(function(){
                this.props.clearState();
            }.bind(this), 3000);
        }
    }

    onDeleteHandler = (id) => {
        console.log(id);
    }

    render() {
        let articles = null;
        if (this.state.loading) {
            articles = <Spinner />
        } else {
            articles = (
                <SmartList
                    smartListHeaders={slArticlesHeaders}
                    smartListContents={this.state.articles}
                    view={'/articles/view'}
                    edit={'/articles/edit'}
                    clicked={this.onDeleteHandler.bind(this)}
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
                        {this.props.articleResponseMessage ? <Alert mode="success" msg={this.props.articleResponseMessage} /> : null}
                        {articles}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        articleResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        clearState: () => dispatch({type: actionType.CLEAR_REDUX_STATE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);