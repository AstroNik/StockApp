import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getData} from "../../Store/Actions/StockActions";
import {Card, Row} from "react-bootstrap";

class Form extends Component {
    state = {
        stockName: '',
        timeSeries: 'TIME_SERIES_INTRADAY',
        interval: '1min',
        outputSize: 'compact',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getData(this.state)
    }

    render() {
        return (
            <Card className="col-md-12 mt-2 pb-2 w-100" style={{fontSize: "11pt"}}>
                <div className="row mt-3">
                    <div className="col-md-3 w-100">
                        <form onSubmit={this.handleSubmit} className="w-100">
                            <h4> Find Stock </h4>
                            <br/>
                            <div className="form-group">
                                <input type="name" className="form-control w-100" id="stockName"
                                       placeholder="Enter stock"
                                       required
                                       onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <button type="Find Stock" className="btn btn-primary btn-block w-100">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-9 row justify-content-around mt-auto mb-auto">
                        <form onSubmit={this.handleSubmit} className="col-md-7">
                            <div>
                                <h5><u>Options </u></h5>
                                <ul style={{listStyle: "none", padding: 0}}>
                                    <li>
                                        Time Series:
                                        <Row className="mt-2 mb-2 form-group">
                                            <input type="radio"
                                                   name="TIME_SERIES"
                                                   value="TIME_SERIES_INTRADAY"
                                                   className="ml-3"
                                                   id="timeSeries"
                                                   checked
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> Intraday </label>
                                            <input type="radio"
                                                   name="TIME_SERIES"
                                                   value="TIME_SERIES_DAILY"
                                                   className="ml-3"
                                                   id="timeSeries"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> Daily </label>
                                            <input type="radio"
                                                   name="TIME_SERIES"
                                                   value="TIME_SERIES_DAILY_ADJUSTED"
                                                   className="ml-3"
                                                   id="timeSeries"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> Daily Adjusted </label>
                                        </Row>
                                    </li>
                                    <li>
                                        Interval:
                                        <Row className="mt-2 mb-2 form-group">
                                            <input type="radio"
                                                   name="Interval"
                                                   value="1min"
                                                   className="ml-3"
                                                   id="interval"
                                                   checked
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> 1 Min </label>
                                            <input type="radio"
                                                   name="Interval"
                                                   value="5min"
                                                   className="ml-3"
                                                   id="interval"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> 5 Min </label>
                                            <input type="radio"
                                                   name="Interval"
                                                   value="15min"
                                                   className="ml-3"
                                                   id="interval"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> 15 Min </label>
                                            <input type="radio"
                                                   name="Interval"
                                                   value="30min"
                                                   className="ml-3"
                                                   id="interval"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> 30 Min </label>
                                            <input type="radio"
                                                   name="Interval"
                                                   value="60min"
                                                   className="ml-3"
                                                   id="interval"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> 60 Min </label>
                                        </Row>
                                    </li>
                                    <li>
                                        Output Size:
                                        <Row className="mt-2 mb-2 form-group">
                                            <input type="radio"
                                                   name="OutputSize"
                                                   value="compact"
                                                   className="ml-3"
                                                   id="outputSize"
                                                   checked
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> Compact </label>
                                            <input type="radio"
                                                   name="OutputSize"
                                                   value="full"
                                                   className="ml-3"
                                                   id="outputSize"
                                                   onChange={this.handleChange}/>
                                            <label className="mt-auto mb-auto ml-2"> Full </label>
                                        </Row>
                                    </li>
                                </ul>
                            </div>
                        </form>
                        <div className="col-md-3 mr-5">
                            <h5><u>Today's Prices</u></h5>
                            <ol style={{fontSize: "12pt"}} className="mt-4">
                                <li> open - {}</li>
                                <li> high - {}</li>
                                <li> low - {}</li>
                                <li> close - {}</li>
                                <li> volume - {}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stock: state.stock.stockData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (data) => dispatch(getData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
