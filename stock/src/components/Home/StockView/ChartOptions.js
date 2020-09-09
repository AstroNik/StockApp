import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {FormControl,InputLabel, Select,MenuItem} from "@material-ui/core";
import {connect} from 'react-redux'
import {setChartOptions} from "../../Store/Actions/StockActions";

class ChartOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yValue: '1. open'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.setChartOptions(e.target.value)
    }

    render() {
        const {series} = this.props
        return (
            <Card className="p-5 h-100" style={{width:"20vw"}}>
                <div>
                    <h4 style={{textAlign: "center"}}> Chart Options </h4>
                    <br/>
                    <br/>
                    <FormControl variant="outlined">
                        <InputLabel id="yValue-label">Y Value</InputLabel>
                            {series !== "TIME_SERIES_DAILY_ADJUSTED" ? (
                                <Select
                                    labelId="yValue-label"
                                    id="yValue"
                                    name="yValue"
                                    value={this.state.yValue}
                                    onChange={this.handleChange}
                                    label="yValue"
                                    className="w-100"
                                >
                                    <MenuItem value={"1. open"}>Open</MenuItem>
                                    <MenuItem value={"2. high"}>High</MenuItem>
                                    <MenuItem value={"3. low"}>Low</MenuItem>
                                    <MenuItem value={"4. close"}>Close</MenuItem>
                                    <MenuItem value={"5. volume"}>Volume</MenuItem>
                                </Select>
                            ) : (
                                <Select
                                    labelId="yValue-label"
                                    id="yValue"
                                    name="yValue"
                                    value={this.state.yValue}
                                    onChange={this.handleChange}
                                    label="yValue"
                                    className="w-100"
                                >
                                    <MenuItem value={"1. open"}>Open</MenuItem>
                                    <MenuItem value={"2. high"}>High</MenuItem>
                                    <MenuItem value={"3. low"}>Low</MenuItem>
                                    <MenuItem value={"4. close"}>Close</MenuItem>
                                    <MenuItem value={"5. adjusted close"}>Adjusted Close</MenuItem>
                                    <MenuItem value={"6. volume"}>Volume</MenuItem>
                                </Select>
                            )}

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
