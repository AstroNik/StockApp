const initState = {
    stockOptions: {
        stock: '',
        timeSeries: '',
        interval: '',
        outputSize: '',
    },
    stockData: [],
}

const StockReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            console.log('Stock data retrieved')
            return{
                ...state,
                stockData: action.stockData,
                stockOptions: action.options
            }
        default:
            return state
    }

}

export default StockReducer
