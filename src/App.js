import React, { Component }from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    //a router component can only have one child element.
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>    
    );
  }
}

export default App;
