import React from 'react';
import '../App.css';
import Header from '../Components/Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';

import SmartList from '../hoc/SmartList';

const sideList = [
    {link: '/login', label: 'Login', id: '1'},
    {link: '/signup', label: 'SignUp', id: '2'},
    {link: '/articles', label: 'Articles', id: '3'},
];

const smartListHeaders = [
    {label: 'Title'},
    {label: 'Created'},
];

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
                <div className="row">
                    <div className="col-sm-4">
                        <SideBar sideList={sideList}/>
                    </div>
                    <div className="col-sm-8">
                        <SmartList
                            smartListHeaders={smartListHeaders}
                            smartListContents={this.state.articles}
                            view={'/articles/view'}
                            edit={'/articles/edit'}
                            delete={'/articles/delete'}
                            id="id" 
                        />
                    </div>
                </div> 
            </div>
        );
    }
}

export default ArticleView;