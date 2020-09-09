import React, {Component} from "react";
import './StockView/StockView'
import StockView from "./StockView/StockView";
import {Row} from "react-bootstrap";
import Form from "./StockView/Form";
import ChartOptions from "./StockView/ChartOptions";
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
