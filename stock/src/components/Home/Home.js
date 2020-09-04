import React, {Component} from "react";
import './StockView/StockView'
import StockView from "./StockView/StockView";
import {Container} from "react-bootstrap";

class Home extends Component {
    render() {
        return (
            <Container fluid>
                <StockView/>
            </Container>
        )
    }
}

export default Home
