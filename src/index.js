import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//rooter
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//components
import HomePage from './components/homepage';
import HowItWorks from './components/howitworks';
import AboutUs from './components/aboutus';
import Authentication from './components/authentication';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutUs} />
      <Route path="/howitworks" component={HowItWorks} />
      <Route path="/authentication" component={Authentication} />
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
