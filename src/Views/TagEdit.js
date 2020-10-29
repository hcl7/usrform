import React, { Component } from 'react';
import Layout from '../hoc/Layout';
import Input from '../Components/Input';
import Alert from '../Helpers/Alert';
import axios from '../hoc/axios-baseurl';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';

class TagEdit extends Component {
    state = {
        title: '',
        articles: [],
        posted: true,
        selectedArticles: [],
        articlesTag: []
    }

    componentDidMount() {
        this.loadTagHandler();
    }

    changedTagHandler = (e) => {
        this.setState({ title: e.target.value });
    }

    changedSelectedArticlesHandler = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(this.state.articles[i]);
            }
        }
        this.setState({ selectedArticles: value });
    }

    addArticlesTagToSelectedArticles(){
        const articles = this.state.articles;
        const articlesTag = this.state.articlesTag;
        for (let i = 0, l = articlesTag.length; i < l; i++) {
            articles.forEach(article => {
                if (article.id === articlesTag[i]) {
                    this.setState({
                        selectedArticles: [
                            ...this.state.selectedArticles,
                            article
                        ]
                    });
                }
            });
        }
        console.log('selected: ', this.state.selectedArticles);
    }

    loadTagHandler = () => {
        const self = this;
        let id = this.props.match.params.id;
        axios.get('/tags/view/' + id)
            .then(function (response) {
                console.log("Articles For This Tag: ", response.data.tag);
                const tag = response.data.tag.title;
                const articles = response.data.articles;
                self.setState({ articles: articles, title: tag, articlesTag: response.data.tag.articles.map(sa => sa.id) });
                self.addArticlesTagToSelectedArticles();
            })
            .catch(function (error) {
                console.log(error.message);
            })
            .finally(function () { })
    }

    onSubmitHandler = () => {
        const self = this;
        const data = {
            title: this.state.title,
            articles: this.state.selectedArticles
        }
        let id = this.props.match.params.id;
        axios.post('/tags/edit/' + id, data)
            .then(response => {
                console.log('Tag posted: ', data);
                self.setState({ posted: true });
                this.props.onGetError(response.data.message);
                this.props.history.push('/tags');
            })
            .catch(function (error) {
                self.setState({ posted: false });
                self.props.onGetError(error.message);
            })
            .finally(function () { });
    }

    render() {
        return (
            <Layout title="Tag Edit">
                {!this.state.posted ? <Alert mode="danger" msg={this.props.tagResponseMessage} /> : null}
                <Input
                    label="Tag"
                    elementType="input"
                    type="text" id="title" name="title"
                    value={this.state.title}
                    changed={this.changedTagHandler}
                />
                <Input
                    label="Articles"
                    elementType="select"
                    multiple
                    changed={this.changedSelectedArticlesHandler}
                    options={this.state.articles}
                    selected={this.state.articlesTag}
                />
                <div className="form-controls">
                    <button className="btn btn-danger" type="button" onClick={this.onSubmitHandler}>Edit Tag</button>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        tagResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetError: (error) => dispatch({ type: actionType.POST_RESPONSE_MESSAGE, error: error })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagEdit);