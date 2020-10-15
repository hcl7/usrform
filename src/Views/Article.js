import React, {Component} from 'react';
import Input from '../Components/Input';
import Layout from '../hoc/Layout';
import axios from '../hoc/axios-baseurl';

class Article extends Component {
    state = {
        title: '',
        body: '',
        tags: [],
        selectedTags: []
    }

    componentDidMount(){
        this.loadTagsHandler();
    }

    loadTagsHandler = () => {
        const self = this;
        axios.get('/tags')
            .then(function (response) {
                console.log('Tags: ', response.data);
                self.setState({tags: response.data});
            })
            .catch(function (error){
                console.log(error.message);
            })
            .finally(function () {}
        );
    }

    changedTitleHandler = (e) => {
        this.setState({title: e.target.value});
    }

    changedBodyHandler = (e) => {
        this.setState({body: e.target.value});
    }

    changedSelectHandler = (e) => {
        this.setState({selectedTags: e.target.value});
    }

    onSubmitHandler = () => {
        const self = this;
        const data = self.state;
        axios.post('/articles/add', data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error){
                console.log(error.message);
            })
            .finally(function () {}
        );
    }

    render () {
        return (
            <Layout>
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
                    htmlFor="tags"
                    label="Tags"
                    elementType="select"
                    multiple
                    options={this.state.tags}
                    changed={this.changedSelectHandler} />
                
                <div className="form-group">
                    <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler}>Add Article</button>
                </div>
            </Layout>
        );
    }
}

export default Article;