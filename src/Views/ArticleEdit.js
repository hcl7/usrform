import React, { Component } from 'react';
import axios from '../hoc/axios-baseurl';
import Layout from '../hoc/Layout';
import Input from '../Components/Input';
import Alert from '../Helpers/Alert';
import * as actionType from '../store/actions';
import { connect } from 'react-redux';

class ArticleEdit extends Component {

    state = {
        title: '',
        body: '',
        posted: true,
        tags: []
    }

    componentDidMount() {
        this.loadArticleHandler();
    }

    loadArticleHandler = () => {
        const self = this;
        let id = this.props.match.params.id;
        axios.get('/articles/view/' + id)
            .then(function (response) {
                console.log('Artcle data: ', response.data);
                const article = response.data;
                const tags = response.data.tags;
                self.setState({ title: article.title, body: article.body, tags: tags });

            })
            .catch(function (error) {
                console.log("Get Error User:" + error.message);
            })
            .finally(function () { });
    }

    changedTitleHandler = (e) => {
        this.setState({ title: e.target.value });
    }

    changedBodyHandler = (e) => {
        this.setState({body: e.target.value});
    }

    changedSelectHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler = (e) => {
        const self = this;
        const articlePost = self.state;
        let id = this.props.match.params.id;
        axios.post('/articles/edit/' + id, articlePost)
            .then(response => {
                console.log('Article posted: ', articlePost);
                self.setState({ posted: true});
                this.props.onGetError(response.data.message);
                this.props.history.push('/articles');
            })
            .catch(function (error) {
                console.log('Post Error: ' + error.message);
                self.setState({ posted: false});
                self.props.onGetError(error.message);
            })
            .finally(function () { });
    }

    render() {
        return (
            <Layout title="Article Edit">
                {!this.state.posted ? <Alert mode="danger" msg={this.props.articleResponseMessage} /> : null}
                <Input
                    htmlFor="title"
                    label="Title"
                    elementType="input"
                    type="text" id="title" name="title"
                    value={this.state.title}
                    changed={this.changedTitleHandler}
                />
                <Input
                    htmlFor="body"
                    label="Body"
                    elementType="input"
                    type="text" id="body" name="body"
                    value={this.state.body}
                    changed={this.changedBodyHandler}
                />
                <Input
                    htmlfor="Tags"
                    label="Tags"
                    elementType="select" id="tags" name="tags"
                    changed={this.changedSelectHandler}
                    options={this.state.tags}
                />
                <div className="form-group">
                    <button className="btn btn-danger" type="button" onClick={this.onSubmitHandler.bind(this)}>Edit Article</button>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    console.log('Article Redux State: ');
    return {
        articleResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetError: (error) => dispatch({type: actionType.POST_RESPONSE_MESSAGE, error: error})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);