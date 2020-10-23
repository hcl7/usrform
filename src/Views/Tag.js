import React, { Component } from 'react';
import axios from '../hoc/axios-baseurl';
import Layout from '../hoc/Layout';
import Input from '../Components/Input';
import Alert from '../Helpers/Alert';
import * as actionType from '../store/actions';
import { connect } from 'react-redux';

class Tag extends Component {

    state = {
        title: '',
        articles: [],
        selectedArticles: [],
        posted: true
    }

    componentDidMount(){
        this.loadArticlesHandler();
    }

    loadArticlesHandler = () => {
        const self = this;
        axios.get('/articles')
            .then(function (response) {
                console.log('Articles: ', response.data);
                self.setState({articles: response.data});
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

    changedSelectHandler = (e) => {
        let options = e.target.options;
        let value = [];
        for( let i = 0, l = options.length; i<l; i++){
            if(options[i].selected) {
                value.push(this.state.articles[i]);
            }
        }
        this.setState({selectedArticles: value});
    }

    onSubmitHandler = () => {
        const self = this;
        let data = {
            title: this.state.title,
            articles: this.state.selectedArticles
        };
        axios.post('/tags/add', data)
            .then(function (response) {
                console.log("posted: ", data);
                self.setState({posted: true});
                self.props.onGetError(response.data.message);
                self.props.history.push('/tags');
            })
            .catch(function (error){
                console.log(error.message);
                self.setState({posted: false});
            })
            .finally(function () {}
        );
    }

    render() {
        console.log('selected: ', this.state.title);
        return(
            <Layout title="New Tag">
                {!this.state.posted ? <Alert mode="danger" msg={this.props.tagResponseMessage} /> : null}
                <Input
                    htmlFor="title"
                    label="Title"
                    elementType="input"
                    type="text" id="title" name="title"
                    value={this.state.title}
                    changed={this.changedTitleHandler}
                />
                <Input
                    htmlFor="articles"
                    label="Articles"
                    elementType="select"
                    multiple
                    options={this.state.articles}
                    changed={this.changedSelectHandler} />
                
                <div className="form-group">
                    <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler}>Add Tag</button>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state =>{
    return {
        tagResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetError: (error) => dispatch({type: actionType.POST_RESPONSE_MESSAGE, error: error})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tag);