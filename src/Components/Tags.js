import React, { Component } from 'react';
import { sideList, slTagHeaders, formatDate } from '../Helpers/RoutersConfig';
import Navigation from '../Views/Navigation';
import SideBar from '../Views/Sidebar';
import Header from '../Components/Header';
import SmartList from '../hoc/SmartList';
import axios from '../hoc/axios-baseurl';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';
import Spinner from '../Helpers/Spinner';
import Alert from '../Helpers/Alert';

class Tags extends Component {
    state = {
        tags: [],
        loading: true
    }

    loadTagsHandler = () => {
        const self = this;
        axios.get('/tags')
            .then(function (response) {
                const tags = response.data;
                const updateTags = tags.map(tag => {
                    console.log('Tags: ', tag)
                    tag.created = formatDate(tag.created);
                    tag.modified = formatDate(tag.modified);
                    return {
                        ...tag
                    }
                });
                self.setState({ tags: updateTags, loading: false });
            })
            .catch(function (error) {
                console.log('Get Tags Error: ' + error.message);
            })
            .finally(function () { });
    }

    componentDidMount() {
        this.loadTagsHandler();
    }

    render() {
        let tags = null;
        if (this.state.loading) {
            tags = <Spinner />
        }
        else {
            tags = (
                <SmartList
                    smartListHeaders={slTagHeaders}
                    smartListContents={this.state.tags}
                    view={'/tags/view'}
                    edit={'/tags/edit'}
                    delete={'/tags/delete'}
                    where="id"
                />
            );
        }
        if (this.props.tagResponseMessage){
            setTimeout(function(){
                this.props.clearState();
           }.bind(this),3000); 
        }
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header="Tags" />
                        {this.props.tagResponseMessage ? <Alert mode="success" msg={this.props.tagResponseMessage} /> : null}
                        {tags}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tagResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        clearState: () => dispatch({type: actionType.CLEAR_REDUX_STATE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);