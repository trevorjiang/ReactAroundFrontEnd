import React from 'react';
import {Header} from './Header.js'
import {Main} from './Main.js'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
