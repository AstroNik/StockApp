import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getData} from "../../Store/Actions/StockActions";
import {Card} from "react-bootstrap";

class Form extends Component {
    state = {
        stockName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.getData(this.state)
    }

    render() {
        return (
            <Card className="col-md-12 mt-2 pb-2">
                <div className="row mt-3">
                    <div className="col-md-4 w-100">
                        <form onSubmit={this.handleSubmit} className="w-100">
                            <h4> Find Stock </h4>
                            <br/>
                            <div className="form-group">
                                <input type="name" className="form-control w-100" id="stockName"
                                       placeholder="Enter stock"
                                       onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <button type="Find Stock" className="btn btn-primary btn-block w-100">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-8 row justify-content-around mt-auto mb-auto">
                        <div className="col-md-4">
                            <ol>
                                <li> open - {}</li>
                                <li> high - "514.6900"</li>
                                <li> low - "514.1600"</li>
                                <li> close - "514.4300"</li>
                                <li> volume - "28811"</li>
                            </ol>
                        </div>
                        <div className="col-md-4">
                            <ol>
                                <li> open - "514.4000"</li>
                                <li> high - "514.6900"</li>
                                <li> low - "514.1600"</li>
                                <li> close - "514.4300"</li>
                                <li> volume - "28811"</li>
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
        stock: state.stock.stocks,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (stock) => dispatch(getData(stock))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
