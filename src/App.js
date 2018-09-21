import React, { Component } from 'react';
import Footer from './components/footer/Footer';
import AtylaRouter from './router/atyla-router';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import HttpsRedirect from 'react-https-redirect';
import reducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { history } from './helpers/history';

const loggerMiddleware = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <HttpsRedirect>
            <Router history={history}>
              <AtylaRouter />
            </Router>
          </HttpsRedirect>
        </div>
      </Provider>
    );
  }
}

export default App;
