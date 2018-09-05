import React, { Component } from 'react';
import Footer from './components/footer/Footer';
import AtylaRouter from './router/atyla-router';
import { BrowserRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import HttpsRedirect from 'react-https-redirect';

class App extends Component {
  render() {
    return (
      <div>
        <HttpsRedirect>
          <BrowserRouter>
            <AtylaRouter />
          </BrowserRouter>
        </HttpsRedirect>
      </div>
    );
  }
}

export default App;
