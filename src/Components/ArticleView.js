import React from 'react';
import '../App.css';
import Header from '../Components/Header';

import axios from '../hoc/axios-baseurl';

class ArticleView extends React.Component {
    state = {
        articles: []
    }

    loadArticles = () => {
        const self = this;
        axios.get('/articles')
            .then(function (response) {
                const articles = response.data;
                const updateArticles = articles.map(article=>{
                    return {
                        ...article
                    }
                });
                self.setState({articles: updateArticles});
                console.log('Articles: ' + updateArticles);
            })
            .catch(function (error) {
                console.log('Get Error: ' + error.message);
            })
            .finally(function () {
                
            }
        );
    }

    componentDidMount(){
        this.loadArticles();
    }

    render(){
        return (
            <div className="container">
                <Header header="Articles" />
                <div className="table-resposive-md">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Created</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.articles && Array.isArray(this.state.articles ) && this.state.articles.map(function(article, i) {
                                return (
                                <tr key={i}>
                                    <td>{article.title}</td>
                                    <td>{article.created}</td>
                                    <td>action</td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ArticleView;