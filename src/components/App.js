import React from 'react';
import {Header} from './Header.js'
import {Main} from './Main.js'
import {TOKEN_KEY} from "../constants";

import '../styles/App.css';

class App extends React.Component {
  state = {
    isLogin: !!localStorage.getItem(TOKEN_KEY),
  }

  loginHandler = (response) => {
    localStorage.setItem(TOKEN_KEY, response)
    this.setState({isLogin: true});
  }

  logoutHandler = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({isLogin: false});
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLogin} logoutHandler={this.logoutHandler}/>
        <Main isLoggedIn={this.state.isLogin} loginHandler={this.loginHandler}/>
      </div>
    );
  }
}

export default App;
