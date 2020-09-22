import React, { Component } from 'react';
import Articles from '../Components/Articles';

class TagView extends Component {
    state = {
        tags: [],
        Articles: []
    }

    loadTagHandler= () => {

    }
    componentDidMount(){
        this.loadTagHandler();
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default TagView;