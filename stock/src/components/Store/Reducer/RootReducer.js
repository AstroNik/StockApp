import StockReducer from "./StockReducer";
import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import {firebaseReducer} from "react-redux-firebase";

const RootReducer = combineReducers({
    auth: AuthReducer,
    stock: StockReducer,
    firebase: firebaseReducer
})

export default RootReducer
