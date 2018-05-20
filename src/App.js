import React, { Component } from 'react';
import Footer from './components/footer/Footer';
import Newsletter from './components/newsletter/Newsletter';
import AtylaRouter from './router/atyla-router';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <AtylaRouter />
        </BrowserRouter>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}

export default App;