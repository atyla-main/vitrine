import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './components/homepage';

ReactDOM.render(<HomePage />, document.getElementById('root'));
registerServiceWorker();
