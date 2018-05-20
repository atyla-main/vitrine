import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
// import HomePage from './components/homepage';
import './services/i18n';
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
