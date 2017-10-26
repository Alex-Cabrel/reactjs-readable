import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import './index.css'
import { fetchCategories, fetchPosts, fetchAllComments } from './actions'
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk))
)

store.dispatch(fetchPosts())
store.dispatch(fetchCategories())
store.dispatch(fetchAllComments())

/*Wrap the appplication in the component Provider to creat 
the direct link between the store and all the subcomponents.
BrowserRouter component will help navigate correctly through the app using URLs*/

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
