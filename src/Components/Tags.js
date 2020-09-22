import React, { Component } from 'react';
import {sideList, slTagHeaders, formatDate} from '../Helpers/RoutersConfig';
import Navigation from '../Views/Navigation';
import SideBar from '../Views/Sidebar';
import Header from '../Components/Header';
import SmartList from '../hoc/SmartList';
import axios from '../hoc/axios-baseurl';


class Tags extends Component {
    state = {
        tags: []
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
                self.setState({tags: updateTags});
            })
            .catch(function (error) {
                console.log('Get Tags Error: ' + error.message);
            })
            .finally(function (){});
    }

    componentDidMount(){
        this.loadTagsHandler();
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
                        <Header header="Tags" />
                        <SmartList
                            smartListHeaders={slTagHeaders}
                            smartListContents={this.state.tags}
                            view={'/tags/view'}
                            edit={'/tags/edit'}
                            delete={'/tags/delete'}
                            where="id"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Tags;