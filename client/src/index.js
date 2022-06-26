import React from 'react';
import './styles/css/global.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux'
import allreducers from './reducers'
import { Provider } from 'react-redux'

const store = createStore(
    allreducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
