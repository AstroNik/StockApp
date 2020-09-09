import React, {useEffect, useState} from 'react'
import {Line} from "react-chartjs-2";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";

const StockView = (props) => {
    const {stockData, yValue} = props
    const [chartData, setChartData] = useState({})
    const [oldYValue, setOldYValue] = useState(yValue)
    const [label, setLabel] = useState("")

    function isEmpty(stockData) {
        for (let prop in stockData) {
            if (stockData.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    useEffect(() => {
        let chartData = []

        if (!isEmpty(stockData) || oldYValue !== yValue) {
            for (let key in stockData) {
                const container = {}
                container.x = key
                container.y = stockData[key][yValue]
                chartData.push(container)
            }
        }

        const chart = () => {
            setChartData({
                // labels: [moment().startOf('day'), moment().endOf('day')],
                datasets: [
                    {
                        label: yValue.substring(3),
                        data: chartData,
                        backgroundColor: ['rgba(75,192,192,0.6)'],
                        borderWidth: 4
                    }
                ],
            })
        }

        setOldYValue(yValue)

        if(yValue.substring(3) === "volume"){

            setLabel("Volume")
        } else {
            setLabel("Price ($)")
        }

        chart()
    }, [stockData, yValue, oldYValue]);

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
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label,
                },
            }]
        }
    }


    return (
        <Card className="h-100" style={{width:"60vw"}}>
            <div className="mt-auto mb-auto">
                <Line data={chartData} options={options} redraw={true}/>
            </div>
        </Card>
    )

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
