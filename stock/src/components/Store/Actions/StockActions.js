import axios from "axios";

function parseData(chartData) {
    let data = []
    for (let key in chartData) {
        const container = {}
        container.date = new Date(key)
        for (let subKey in chartData[key]) {
            let newKey = subKey.substring(3)
            if (newKey !== "volume") {
                container[subKey.substring(3)] = +parseFloat(chartData[key][subKey])
            } else {
                container[subKey.substring(3)] = +parseInt(chartData[key][subKey])
            }
        }
        data.push(container)
    }
    return data
}

export const getData = (options) => {
    return (dispatch, getState) => {
        axios.post('/api/findStock', {
            stock: options.stockName,
            timeSeries: options.timeSeries,
            interval: options.interval,
            outputSize: options.outputSize
        }).then(({data}) => {
            dispatch({type: 'GET_DATA', stockData: parseData(data), options: options})
        }, (error) => {
            console.log(error)
        })
    }
}
