import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getData} from "../../../Store/Actions/StockActions";
import {Card, Col, Row} from "react-bootstrap";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    FormGroup,
    Checkbox
} from '@material-ui/core'

class Form extends Component {
    state = {
        stockName: '',
        timeSeries: 'TIME_SERIES_INTRADAY',
        interval: '1min',
        outputSize: 'compact',
        disabled: false,
        tIndicators: 'averages',
        sma: '',
        checkedA: false,
        ema: '',
        checkedB: false,
        wma: '',
        checkedC: false,
        tma: '',
        checkedD: false,
        series_type: '',
    }

    handleBasicChange = (e) => {
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
        } else if (e.target.value === "TIME_SERIES_DAILY" || e.target.value === "TIME_SERIES_DAILY_ADJUSTED") {
            this.setState({
                disabled: true
            })
            this.setState({
                interval: ''
            })
            this.setState({
                [e.target.name]: e.target.value
            })
        } else {
            console.log("here")
            this.setState({
                [e.target.name]: e.target.value
            })
            if(this.state.tIndicators !== 'averages'){
                this.setState({
                    sma: ''
                })
                this.setState({
                    checkedA: false
                })
                this.setState({
                    ema: ''
                })
                this.setState({
                    checkedB: false
                })
                this.setState({
                    wma: ''
                })
                this.setState({
                    checkedC: false
                })
                this.setState({
                    tma: ''
                })
                this.setState({
                    checkedD: false
                })
            }
        }
    }

    handleCheckboxChange = (e) => {
        if (e.target.name === "checkedA" ||
            e.target.name === "checkedB" ||
            e.target.name === "checkedC" ||
            e.target.name === "checkedD") {
            this.setState({
                ...this.state, [e.target.name]: e.target.checked
            })
            if(e.target.checked){
                this.setState({
                    [e.target.id]:e.target.value
                })
            } else {
                this.setState({
                    [e.target.id]: ''
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getData(this.state)
    }


    render() {
        return (
            <Card className="h-100 p-4" style={{width: "20vw"}}>
                <Row>
                    <Col style={{width: "20vw"}}>
                        <form className="h-100">
                            <div>
                                <h4 style={{textAlign: "center"}}> Find A Stock </h4>
                                <br/>
                                <TextField id="outlined-basic"
                                           label="Stock Name"
                                           variant="outlined"
                                           name="stockName"
                                           required
                                           className="w-100"
                                           onChange={this.handleBasicChange}/>
                            </div>
                            <br/>
                            <br/>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Time Series</FormLabel>
                                    <RadioGroup row aria-label="time_series" name="timeSeries"
                                                value={this.state.timeSeries}
                                                onChange={this.handleBasicChange}>
                                        <FormControlLabel value="TIME_SERIES_INTRADAY" control={<Radio/>}
                                                          label="Intraday"/>
                                        <FormControlLabel value="TIME_SERIES_DAILY" control={<Radio/>} label="Daily"/>
                                        <FormControlLabel value="TIME_SERIES_DAILY_ADJUSTED" control={<Radio/>}
                                                          label="Daily Adjusted"/>
                                    </RadioGroup>
                                </FormControl>

                                <FormControl component="fieldset" disabled={this.state.disabled}>
                                    <FormLabel component="legend">Interval</FormLabel>
                                    <RadioGroup row aria-label="interval" name="interval" value={this.state.interval}
                                                onChange={this.handleBasicChange}>
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
                                                value={this.state.outputSize} onChange={this.handleBasicChange}>
                                        <FormControlLabel value="compact" control={<Radio/>} label="Compact"/>
                                        <FormControlLabel value="full" control={<Radio/>} label="Full"/>
                                    </RadioGroup>
                                </FormControl>

                            </div>
                            <br/>
                        </form>
                    </Col>
                    <Col style={{width: "20vw", display: 'none'}}>
                        <div style={{width: "20vw"}}>
                            <h4 style={{textAlign: "center"}}> Technical Indicators </h4>
                            <br/>
                            <FormControl variant="outlined" className="w-100">
                                <InputLabel id="tIndicators-label">Indicator</InputLabel>
                                <Select
                                    labelId="tIndicators-label"
                                    id="tIndicators"
                                    name="tIndicators"
                                    value={this.state.tIndicators}
                                    onChange={this.handleBasicChange}
                                    label="tIndicators"
                                    className="w-100"
                                >
                                    <MenuItem value={"averages"}>Averages</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            {this.state.tIndicators === 'averages'? (
                                <FormGroup row>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.checkedA} onChange={this.handleCheckboxChange} value={"SMA"} name="checkedA" id="sma"/>}
                                        label="SMA"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.checkedB} onChange={this.handleCheckboxChange} value={"EMA"} name="checkedB" id="ema"/>}
                                        label="EMA"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.checkedC} onChange={this.handleCheckboxChange} value={"WMA"} name="checkedC" id="wma"/>}
                                        label="WMA"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.checkedD} onChange={this.handleCheckboxChange} value={"TRIMA"} name="checkedD" id="tma"/>}
                                        label="TMA"
                                    />
                                </FormGroup>

                            ) : (
                                <div></div>
                            )}
                            <br/>
                            <FormControl variant="outlined" className="w-50">
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
                            <FormControl variant="outlined" className="w-50">
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
                    </Col>
                </Row>
                <div className="w-50 mx-auto">
                    <Button variant="contained" color="primary" className="w-100" onClick={this.handleSubmit}> Get
                        Data </Button>
                </div>
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
