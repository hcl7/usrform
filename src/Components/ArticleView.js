import React from 'react';
import '../App.css';
import Header from '../Components/Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import {sideList, slArticlesHeaders, formatDate} from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';

class ArticleView extends React.Component {
    state = {
        articles: {
            title: [],
            created: []
        }
    }

    loadArticlesHandler = () => {
        const self = this;
        axios.get('/articles')
            .then(function (response) {
                const articles = response.data;
                const updateArticles = articles.map(article=>{
                    console.log('articles: ', formatDate(article.created));
                    return {
                        ...article
                    }
                });
                self.setState({articles: updateArticles});
            })
            .catch(function (error) {
                console.log('Get ArticleView Error: ' + error.message);
            })
            .finally(function () {
                
            }
        );
    }

    componentDidMount(){
        this.loadArticlesHandler();
    }

    render(){
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{marginTop: '60px'}}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList}/>
                    </div>
                    <div className="col-sm-8">
                        <Header header="Articles" />
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
        );
    }
}

export default ArticleView;