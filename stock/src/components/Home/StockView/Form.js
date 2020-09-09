import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getData, setChatYValue} from "../../Store/Actions/StockActions";
import {Card} from "react-bootstrap";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from '@material-ui/core'

class Form extends Component {
    state = {
        stockName: '',
        timeSeries: 'TIME_SERIES_INTRADAY',
        interval: '1min',
        outputSize: 'compact',
        disabled: false
    }

    handleChange = (e) => {
        if (e.target.value === "TIME_SERIES_INTRADAY") {
            this.setState({
                disabled: false
            })
            this.setState({
                interval: '1min'
            })
            this.setState({
                [e.target.name]: e.target.value
            })
            this.props.setChatYValue(e.target.value)
        } else if (e.target.value === "TIME_SERIES_DAILY") {
            this.setState({
                disabled: true
            })
            this.setState({
                interval: ''
            })
            this.setState({
                [e.target.name]: e.target.value
            })
            this.props.setChatYValue(e.target.value)
        } else if (e.target.value === "TIME_SERIES_DAILY_ADJUSTED") {
            this.setState({
                disabled: true
            })
            this.setState({
                interval: ''
            })
            this.setState({
                [e.target.name]: e.target.value
            })
            this.props.setChatYValue(e.target.value)
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getData(this.state)
    }


    render() {
        return (
            <Card className="p-5 h-100" style={{width:"20vw"}}>
                <form className="w-100 h-100">
                    <div>
                        <h4 style={{textAlign: "center"}}> Find A Stock </h4>
                        <br/>
                        <TextField id="outlined-basic"
                                   label="Stock Name"
                                   variant="outlined"
                                   name="stockName"
                                   required
                                   className="w-100"
                                   onChange={this.handleChange}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Time Series</FormLabel>
                            <RadioGroup row aria-label="time_series" name="timeSeries" value={this.state.timeSeries}
                                        onChange={this.handleChange}>
                                <FormControlLabel value="TIME_SERIES_INTRADAY" control={<Radio/>} label="Intraday"/>
                                <FormControlLabel value="TIME_SERIES_DAILY" control={<Radio/>} label="Daily"/>
                                <FormControlLabel value="TIME_SERIES_DAILY_ADJUSTED" control={<Radio/>}
                                                  label="Daily Adjusted"/>
                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset" disabled={this.state.disabled}>
                            <FormLabel component="legend">Interval</FormLabel>
                            <RadioGroup row aria-label="interval" name="interval" value={this.state.interval}
                                        onChange={this.handleChange}>
                                <FormControlLabel value="1min" control={<Radio/>} label="1 Min"/>
                                <FormControlLabel value="5min" control={<Radio/>} label="5 Min"/>
                                <FormControlLabel value="15min" control={<Radio/>} label="15 Min"/>
                                <FormControlLabel value="30min" control={<Radio/>} label="30 Min"/>
                                <FormControlLabel value="60min" control={<Radio/>} label="60 Min"/>
                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Output Size</FormLabel>
                            <RadioGroup row aria-label="outputSize" name="outputSize"
                                        value={this.state.outputSize} onChange={this.handleChange}>
                                <FormControlLabel value="compact" control={<Radio/>} label="Compact"/>
                                <FormControlLabel value="full" control={<Radio/>} label="Full"/>
                            </RadioGroup>
                        </FormControl>

                    </div>
                    <br/>
                    <div>
                        <Button variant="contained" color="primary" className="w-100" onClick={this.handleSubmit}> Get Data </Button>
                    </div>
                </form>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stockOptions: state.stock.stockOptions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (data) => dispatch(getData(data)),
        setChatYValue: (data) => dispatch(setChatYValue(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
