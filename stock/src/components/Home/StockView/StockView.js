import React, {useEffect, useState} from 'react'
import Form from './Form'
import {Line} from "react-chartjs-2";
import {connect} from "react-redux";
import {Card, Container} from "react-bootstrap";

const StockView = (props) => {
    const {stock} = props
    let [chartData, setChartData] = useState({})


    function isEmpty(stock) {
        for (let prop in stock) {
            if (stock.hasOwnProperty(prop))
                return false;
        }
        return true;
    }


    useEffect(() => {
        let chartData = []

        if (!isEmpty(stock)) {
            for (let key in stock) {
                const container = {}
                container.x = key
                container.y = stock[key]['5. adjusted close']
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
    }, [stock]);

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
            <div style={{width: "100%", height: "100%"}}>
                <Form/>
                <Card style={{width: "100%", height: "100%"}}>
                    <Line data={chartData} options={options}/>
                </Card>
            </div>
        </Container>
    )

}

const mapStateToProps = (state) => {
    const stock = state.stock.stocks;
    return {
        stock: stock
    }
}

export default connect(mapStateToProps)(StockView)
