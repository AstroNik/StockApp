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

export const setChartOptions = (options) => {
    return (dispatch, getState) => {
        dispatch({type: 'SET_CHART_DATA', yValue: options})
    }
}

export const setChatYValue = (options) => {
    return (dispatch, getState) => {
        dispatch({type: 'SET_SERIES', series: options})
    }
}
