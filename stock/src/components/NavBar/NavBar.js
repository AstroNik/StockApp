import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" className="justify-content-center fixed-top">
                <Navbar.Brand href="/stock">
                    <img src="stock/img/logo.png" alt="logo" width="150px"/>
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default NavBar
