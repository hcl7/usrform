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
        tags: [],
        selected: [],
        tagsArticle: []
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
                const article = response.data.article;
                const tags = response.data.tags;
                self.setState({ title: article.title, body: article.body, tags: tags, tagsArticle: article.tags.map(st=>st.id)});
                self.addTagsArticleToSelectedTags();
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
        let options = e.target.options;
        let value = [];
        for( let i = 0, l = options.length; i<l; i++){
            if(options[i].selected) {
                value.push(this.state.tags[i]);
            }
        }
        this.setState({selected: value});
    }

    addTagsArticleToSelectedTags(){
        const tags = this.state.tags;
        const tagsArticle = this.state.tagsArticle;
        for(let i=0,l=tagsArticle.length; i<l; i++){
            tags.forEach(tag => {
                if(tag.id === tagsArticle[i]){
                    this.setState({
                        selected: [
                            ...this.state.selected,
                            tag
                        ]
                    });
                }
            });
        }
        console.log('selected: ', this.state.selected);
    }

    onSubmitHandler = (e) => {
        const self = this;
        const dataPost = {
            title: this.state.title,
            body: this.state.body,
            tags: this.state.selected
        }
        console.log('Article posted: ', dataPost);
        let id = this.props.match.params.id;
        axios.post('/articles/edit/' + id, dataPost)
            .then(response => {
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
                    multiple
                    changed={this.changedSelectHandler}
                    options={this.state.tags}
                    selected={this.state.tagsArticle}
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