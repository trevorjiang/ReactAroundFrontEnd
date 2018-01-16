import React from 'react';
import {Header} from './Header.js'
import {Main} from './Main.js'
import '../styles/App.css';

class App extends React.Component {
  state = {
    isLogin: false,
  }

  loginHandler = () => {
    this.setState({isLogin: true});
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Main isLoggedIn={this.state.isLogin} loginHandler={this.loginHandler}/>
      </div>
    );
  }
}

export default App;
