import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-flags-select/css/react-flags-select.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
// import HomePage from './components/homepage';
import './services/i18n';
import App from './App';

ReactDOM.render(
  <img
    src={`${process.env.PUBLIC_URL}/home.png`}
    style={{
      display: 'block',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
  />,
  document.getElementById('root')
);
registerServiceWorker();
