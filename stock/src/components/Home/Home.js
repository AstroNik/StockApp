import React, {Component} from "react";
import './View/Basic/StockView/StockView'
import StockView from "./View/Basic/StockView/StockView";
import {Row} from "react-bootstrap";
import Form from "./View/Basic/Form";

class Home extends Component {
    render() {
        return (
            <div className="landing-page">
                <Row className="h-100 w-100 p-0 m-0">
                    <Form/>
                    <StockView/>
                </Row>
            </div>
        )
    }
}

export default Home
