const initState = {
    options: {
        stock: '',
        timeSeries: '',
        interval: '',
        outputSize: '',
    },
    stockData: {}
}

const StockReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            console.log('get stock data', action.stock)
            return{
                ...state,
                stockData: action.stockData,
                options: action.options
            }
        default:
            return state
    }

}

export default StockReducer
