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
          <img
            src={`${process.env.PUBLIC_URL}/home.png`}
            style={{
              display: 'block',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />
        </HttpsRedirect>
      </div>
    );
  }
}

export default App;
