import axios from "axios";

export const getData = (options) => {
    return (dispatch, getState) => {
        axios.post('/stock/api/findStock', {
            stock: options.stockName,
            timeSeries: options.timeSeries,
            interval: options.interval,
            outputSize: options.outputSize
        }).then(({data}) => {
            dispatch({type: 'GET_DATA', stockData: data, options: options})
        }, (error) => {
            console.log(error)
        })
    }
}
