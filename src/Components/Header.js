import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stateHeader: null
        };
    }

    static getDerivedStateFromProps(props, state){
        return {
            stateHeader: props.header
        };
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.stateHeader}</h1>
            </div>
        );
    }    
}

export default Header;