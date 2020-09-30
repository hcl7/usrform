import React, { Component } from 'react';
import axios from '../hoc/axios-baseurl';
import Layout from '../hoc/Layout';
import TextInput from '../Components/TextInput';
import Alert from '../Helpers/Alert';

class ArticleEdit extends Component {

    state = {
        title: '',
        body: '',
        posted: true,
        tags: [],
        error: []
    }

    componentDidMount() {
        this.loadArticleHandler();
    }

    loadArticleHandler = () => {
        const self = this;
        let id = this.props.match.params.id;
        axios.get('/articles/view/' + id)
            .then(function (response) {
                console.log('Artcle data: ', response.data.tags);
                const article = response.data;
                const tags = response.data.tags;
                self.setState({ title: article.title, body: article.body, tags: tags });

            })
            .catch(function (error) {
                console.log("Get Error User:" + error.message);
            })
            .finally(function () { });
    }

    changedHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = () => {
        const self = this;
        const articlePost = self.state;
        let id = this.props.match.params.id;
        axios.post('/articles/edit/' + id, articlePost)
            .then(response => {
                console.log('for post: ', articlePost);
                self.setState({posted: true, error: response.data.message});
                this.props.history.push({
                    pathname: '/articles',
                    statusMessage: self.state.error
                });
            })
            .catch(function (error){
                console.log('Post Error: ' + error.message);
                self.setState({posted: false, error: error.message});
            })
            .finally(function () { });
    }

    render() {
        return (
            <Layout title="Article Edit">
                {!this.state.posted ? <Alert mode="success" msg={this.state.error} /> : null}
                <TextInput
                    htmlFor="title"
                    label="Title"
                    inputValid={null}
                    errorMsg={null}
                    inputType="text" id="title" name="title"
                    inputValue={this.state.title}
                    changed={this.changedHandler}
                />
                <TextInput
                    htmlFor="body"
                    label="Body"
                    inputValid={false}
                    errorMsg={false}
                    inputType="text" id="body" name="body"
                    inputValue={this.state.body}
                    changed={this.changedHandler}
                />
                <label>Tags</label>
                <div className="form-group">
                    <select multiple className="form-control" id="tags" name="tags">
                        {this.state.tags && Array.isArray(this.state.tags) && this.state.tags.map((tag, key) => {
                            return <option key={key}>{tag.title}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-danger" type="button" onClick={this.onSubmitHandler}>Edit Article</button>
                </div>
            </Layout>
        );
    }
}

export default ArticleEdit;