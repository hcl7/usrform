import React, { Component } from 'react';
import axios from '../hoc/axios-baseurl';
import {sideList, slArticlesHeaders, formatDate} from '../Helpers/RoutersConfig';
import Navigation from '../Views/Navigation';
import SideBar from './Sidebar';
import Header from '../Components/Header';
import SmartList from '../hoc/SmartList';
import swal from 'sweetalert';

class TagView extends Component {
    state = {
        tags: [],
        articles: []
    }

    loadTagHandler = (id) => {
        const self = this;
        axios.get('/tags/view/' + id)
            .then(function (response) {
                const tags = response.data;
                console.log(tags);
                const articles = tags.articles;
                self.setState({tags: tags});
                const updateArticle = articles.map(article => {
                    article.created = formatDate(article.created);
                    article.modified = formatDate(article.modified);
                    return {
                        ...article
                    }
                });
                self.setState({articles: updateArticle});
            })
            .catch(function (error) {
                console.log("Get Tag Error: ", error.message);
            })
            .finally(function () { });
    }
    componentDidMount() {
        this.loadTagHandler(this.props.match.params.id);
    }

    onDeleteHandler = (id) => {
        const self = this;
        console.log(id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Article!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.post('/articles/delete/' + id)
                    .then(function (response) {
                        self.setState({ error: response.data.message });
                        if(response.data.message){
                            swal(response.data.message, {
                                icon: "success",
                                text: response.data.message
                            });
                        }
                        self.loadTagHandler(self.props.match.params.id);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                        self.setState({ error: error.message });
                        swal(self.state.error, {
                            icon: "error",
                            text: error.message
                        });
                    })
                    .finally(function () { }
                );
            }
            else {
                swal("Your Article is Safe!", {
                    icon: "info"
                });
            }
        });
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
                        <Header header="Tag" />
                        <div className="media border p-3">
                            <div className="media-body">
                                <p>Title:</p>
                                <p>ID:</p>
                                <p>Created:</p>
                                <p>Modified</p>
                            </div>
                            <div className="media-body">
                                <p><small><i>{this.state.tags.title}</i></small></p>
                                <p><small><i>{this.state.tags.id}</i></small></p>
                                <p><small><i>{formatDate(this.state.tags.created)}</i></small></p>
                                <p><small><i>{formatDate(this.state.tags.modified)}</i></small></p>
                            </div>
                        </div>
                        <Header header="Articles Related" />
                        <div className="media border p-3">
                            <SmartList
                                smartListHeaders={slArticlesHeaders}
                                smartListContents={this.state.articles}
                                view={'/articles/view'}
                                edit={'/articles/edit'}
                                clicked={this.onDeleteHandler.bind(this)}
                                where="id"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TagView;