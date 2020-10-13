import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';

const logger = store => {
    return next => {
        return action =>{
            console.log('[Midleware] Dispatching', action);
            const result = next(action);
            console.log('[Midleware] next State', store.getState());
            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger));

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);