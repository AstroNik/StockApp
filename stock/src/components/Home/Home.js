import React, {Component} from "react";
import './View/Basic/StockView/StockView'
import StockView from "./View/Basic/StockView/StockView";
import {Row} from "react-bootstrap";
import Form from "./View/Basic/Form";
import ChartOptions from "./View/Basic/ChartOptions";
import {connect} from "react-redux";

class Home extends Component {
    render() {
        const {yValue} = this.props
        return (
            <div className="landing-page">
                <Row className="h-100 w-100 p-0 m-0">
                    <Form/>
                    <StockView/>
                    <ChartOptions value={yValue}/>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        yValue: state.stock.yValue,
    }
}

export default connect(mapStateToProps)(Home)
