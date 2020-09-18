import React from 'react';
import '../App.css';
import Header from '../Components/Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import {sideList, slArticlesHeaders} from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';
import Aux from '../hoc/Aux';

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
                    //console.log('articles: ', article.title);
                    return {
                        ...article
                    }
                });
                self.setState({articles: updateArticles});
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
            <Aux>
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
                            id="id" 
                        />
                    </div>
                </div> 
            </Aux>
        );
    }
}

export default ArticleView;