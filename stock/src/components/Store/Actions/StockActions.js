import axios from "axios";

export const getData = (stock) => {
    return (dispatch, getState) => {
        axios.post('/findStock', {
            stock: stock.stockName
        }).then(({data}) => {
            dispatch({type: 'GET_DATA', stockData: data})
        }, (error) => {
            console.log(error)
        }).then(() => {
        })
    }
}
