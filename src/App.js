import React from 'react';
import {Header} from './Header.js'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
