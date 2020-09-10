const initState = {
    stockOptions: {
        stock: '',
        timeSeries: '',
        interval: '',
        outputSize: '',
    },
    stockData: [],
    yValue: '1. open',
    series: ''
}

const StockReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            console.log('get stock data', action.stockData)
            return{
                ...state,
                stockData: action.stockData,
                stockOptions: action.options
            }
        case 'SET_CHART_DATA':
            console.log('Setting New Y Value')
            return {
                ...state,
                yValue: action.yValue
            }
        case 'SET_SERIES':
            console.log('Setting Series')
            return {
                ...state,
                series: action.series
            }
        default:
            return state
    }

}

export default StockReducer
