import React, {useEffect, useState} from 'react'
import Form from './Form'
import {Line} from "react-chartjs-2";
import {connect} from "react-redux";
import {Card, Col, Container, Row} from "react-bootstrap";

const StockView = (props) => {
    const {stockData, stockOptions} = props
    let [chartData, setChartData] = useState({})
    console.log(stockOptions)


    function isEmpty(stockData) {
        for (let prop in stockData) {
            if (stockData.hasOwnProperty(prop))
                return false;
        }
        return true;
    }


    useEffect(() => {
        let chartData = []

        if (!isEmpty(stockData)) {
            for (let key in stockData) {
                const container = {}
                container.x = key
                container.y = stockData[key]['1. open']
                chartData.push(container)
            }
        }

        const chart = () => {
            setChartData({
                // labels: [moment().startOf('day'), moment().endOf('day')],
                datasets: [
                    {
                        label: "Stock Price",
                        data: chartData,
                        backgroundColor: ['rgba(75,192,192,0.6)'],
                        borderWidth: 4
                    }
                ],
            })
        }

        chart()
    }, [stockData]);

    const options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date',
                },
                type: 'time',
                display: true,
                distribution: 'linear',
                time: {
                    // unit: 'minute',
                    // unitStepSize: 30,
                    // displayFormats: {
                    //     hour: 'h:mm a',
                    //     min: moment().startOf('day'),
                    //     max: moment().endOf('day'),
                    // }
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Price ($)',
                },
            }]
        }
    }


    return (
        <Container>
            <div className="w-100 h-100">
                <Form/>
                <Row>
                    <Card className="col-md-8">
                        <Line data={chartData} options={options}/>
                    </Card>
                    <Card className="col-md-4 p-2">
                        <div>
                            <h5> Chart Options </h5>
                            <Col>
                                <label> Select X Value: </label>
                                <select className="ml-2 w-25">

                                </select>
                            </Col>
                            <Col>
                                <label> Select Y Value: </label>
                                <select className="ml-2 w-25">

                                </select>
                            </Col>

                        </div>
                    </Card>
                </Row>
            </div>
        </Container>
    )

}

const mapStateToProps = (state) => {
    const stockData = state.stock.stockData;
    const options = state.stock.options;
    return {
        stockData: stockData,
        stockOptions: options,
    }
}

export default connect(mapStateToProps)(StockView)
