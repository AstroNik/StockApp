import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" >
                <Navbar.Brand href="/"> Stock </Navbar.Brand>
            </Navbar>
        )
    }
}

export default NavBar
