import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import RootReducer from "./components/Store/Reducer/RootReducer";
import thunk from "redux-thunk";
import fbConfig from './components/Firebase/fbConfig'
import firebase from "firebase/app";
import {createFirestoreInstance} from "redux-firestore";
import {Provider} from "react-redux";
import {getFirebase, ReactReduxFirebaseProvider} from "react-redux-firebase";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(RootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase}))
    )
);

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();

