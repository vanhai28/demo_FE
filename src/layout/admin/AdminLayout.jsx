import React, { Component } from 'react';
import Header from "../_shared/Header"

class AdminLayout extends Component{
    
    render(){
        
        return (
            <React.Fragment>
                <Header isLogin = {true}/>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default AdminLayout;