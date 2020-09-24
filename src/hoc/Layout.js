import React, { Component } from 'react';
import Navigation from '../Views/Navigation';
import SideBar from '../Views/Sidebar';
import Header from '../Components/Header';
import { sideList } from '../Helpers/RoutersConfig';

class Layout extends Component {

    render() {
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header={this.props.title} />
                        <main>{this.props.children}</main>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;