import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {FormControl, InputLabel, MenuItem, Select, TextField,} from "@material-ui/core";
import {connect} from 'react-redux'
import {setChartOptions} from "../../../Store/Actions/StockActions";

class ChartOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tIndicators: 'SMA',
            interval: '1min',
            time_period: '60',
            series_type: 'open',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Card className="p-5 h-100 justify-content-between" style={{width: "20vw"}}>
                <div>
                    <h4 style={{textAlign: "center"}}> Technical Indicators </h4>
                    <p> STILL IMPLEMENTING </p>
                    <br/>
                    <FormControl variant="outlined">
                        <InputLabel id="tIndicators-label">Indicator</InputLabel>
                        <Select
                            labelId="tIndicators-label"
                            id="tIndicators"
                            name="tIndicators"
                            value={this.state.tIndicators}
                            onChange={this.handleChange}
                            label="tIndicators"
                            className="w-100"
                        >
                            <MenuItem value={"SMA"}>Simple Moving Average</MenuItem>
                            <MenuItem value={"EMA"}>Exponential Moving Average</MenuItem>
                            <MenuItem value={"VWAP"}>Volume Weighted Average Price</MenuItem>
                            <MenuItem value={"MACD"}>Moving Average Convergence / Divergence</MenuItem>
                            <MenuItem value={"STOCH"}>Stochastic Oscillator </MenuItem>
                            <MenuItem value={"RSI"}>Relative Strength Index</MenuItem>
                            <MenuItem value={"ADX"}>Average Directional Movement Index</MenuItem>
                            {/*<MenuItem value={"BBANDS"}>Volume</MenuItem>*/}
                            <MenuItem value={"OBV"}>On-Balance Volume</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl variant="outlined">
                        <InputLabel id="interval-label">Interval</InputLabel>
                        <Select
                            labelId="interval-label"
                            id="interval"
                            name="interval"
                            value={this.state.interval}
                            onChange={this.handleChange}
                            label="interval"
                            className="w-100"
                        >
                            <MenuItem value={"1min"}>1 Min</MenuItem>
                            <MenuItem value={"5min"}>5 Min</MenuItem>
                            <MenuItem value={"15min"}>15 Min</MenuItem>
                            <MenuItem value={"30min"}>30 Min</MenuItem>
                            <MenuItem value={"60min"}>60 Min </MenuItem>
                            <MenuItem value={"daily"}>Daily</MenuItem>
                            <MenuItem value={"weekly"}>Weekly</MenuItem>
                            <MenuItem value={"monthly"}>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <TextField id="outlined-basic"
                               label="Time Period"
                               variant="outlined"
                               name="time_period"
                               required
                               className="w-100"
                               value={this.state.time_period}
                               onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <FormControl variant="outlined">
                        <InputLabel id="series-label">Series Type</InputLabel>
                        <Select
                            labelId="series-label"
                            id="series_type"
                            name="series_type"
                            value={this.state.series_type}
                            onChange={this.handleChange}
                            label="series_type"
                            className="w-100"
                        >
                            <MenuItem value={"open"}>Open</MenuItem>
                            <MenuItem value={"high"}>High</MenuItem>
                            <MenuItem value={"low"}>Low</MenuItem>
                            <MenuItem value={"close"}>Close</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        series: state.stock.series,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChartOptions: (options) => dispatch(setChartOptions(options))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartOptions)
