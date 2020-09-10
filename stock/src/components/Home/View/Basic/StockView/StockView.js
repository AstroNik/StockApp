import React, {Component} from 'react'
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import CandleStickChart from "./CandleStickChart";

class StockView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }

    isEmpty(stockData) {
        for (let prop in stockData) {
            if (stockData.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {stockData} = this.props
        if (prevProps.stockData !== stockData) {
            this.setState({chartData: stockData})
        }
    }

    render() {
        const {chartData} = this.state
        return (
            <Card className="h-100" style={{width: "60vw"}}>
                <div className="mt-auto mb-auto">
                    {!chartData.empty ? (
                        <div> No Data </div>
                    ) : (
                        <CandleStickChart data={this.state.chartData}/>
                    )
                    }

                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const {stockData, options, yValue} = state.stock
    return {
        stockData: stockData,
        stockOptions: options,
        yValue: yValue,
    }
}

export default connect(mapStateToProps)(StockView)
