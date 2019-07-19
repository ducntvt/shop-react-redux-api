import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    myReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
    
);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,

    document.getElementById('root')
);

serviceWorker.unregister();
