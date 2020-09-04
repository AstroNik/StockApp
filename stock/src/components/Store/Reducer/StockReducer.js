const initState = {
    stocks: {}
}

const StockReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            console.log('get stock data', action.stock)
            return{
                ...state,
                stocks: action.stockData
            }
        default:
            return state
    }

}

export default StockReducer