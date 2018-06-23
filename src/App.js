import React, { Component } from 'react';
import Footer from './components/footer/Footer';
import AtylaRouter from './router/atyla-router';
import { BrowserRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <AtylaRouter />
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
