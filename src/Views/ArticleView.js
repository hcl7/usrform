import React, { Component } from 'react';
import SideBar from './Sidebar';
import { sideList, formatDate } from '../Helpers/RoutersConfig';
import Navigation from './Navigation';
import Header from '../Components/Header';
import axios from '../hoc/axios-baseurl';

class ArticleView extends Component {

    state = {
        article: [],
        tags: []
    }

    loadArticleHandler = (id) => {
        const self = this;
        axios.get('/articles/view/' + id)
            .then(function (response) {
                const article = response.data.article;
                console.log('Tags: ', article.tags);
                self.setState({ article: article, tags: article.tags});
            })
            .catch(function (error) {
                console.log('Get Article Error: ' + error.message);
            })
            .finally(function () { });
    }

    componentDidMount() {
        this.loadArticleHandler(this.props.match.params.id);
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
                        <Header header="Article" />
                        <div className="media border p-3">
                            <div className="media-body">
                                <p>Title:</p>
                                <p>Posted on:</p>
                                <p>Body:</p>
                                <p>Tag:</p>
                            </div>
                            <div className="media-body">
                                <p><small><i> {this.state.article.title}</i></small></p>    
                                <p><small><i> {formatDate(this.state.article.created)}</i></small></p>
                                <p><small><i> {this.state.article.body}</i></small></p>
                                <small><i> {this.state.tags.map(value=>{
                                    return (<div key={value.title}>{value.title}</div>);
                                })}</i></small>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleView;