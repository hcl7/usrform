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
        posted: true
    }

    componentDidMount(){
        this.loadTagHandler();
    }

    changedTagHandler = (e) => {
        this.setState({ title: e.target.value });
    }

    loadTagHandler = () => {
        const self = this;
        let id = this.props.match.params.id;
        axios.get('/tags/view/' + id)
            .then(function (response){
                console.log("tag: ", response.data.articles);
                self.setState({articles: response.data.articles, title: response.data.title});
            })
            .catch(function (error){
                console.log(error.message);
            })
            .finally(function (){})
    }

    onSubmitHandler = () =>{
        const self = this;
        const tagPost = self.state;
        let id = this.props.match.params.id;
        axios.post('/tags/edit/' + id, tagPost)
            .then(response => {
                console.log('Tag posted: ', tagPost);
                self.setState({posted: true});
                this.props.onGetError(response.data.message);
                this.props.history.push('/tags');
            })
            .catch(function (error){
                self.setState({posted: false});
                self.props.onGetError(error.message);
            })
            .finally(function () { });
    }

    render(){
        return(
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
                    options={this.state.articles}
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
    return{
        onGetError: (error) => dispatch({type: actionType.POST_RESPONSE_MESSAGE, error: error})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagEdit);