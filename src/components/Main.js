import React from 'react';
import {Register} from "./Register";
import {Login} from "./Login";
import { Switch, Route } from 'react-router-dom';
import {Home} from './Home';
export class Main extends React.Component {
  getLogin = () => {
    return this.props.isLoggedIn ? <Home isLoggedIn={this.props.isLoggedIn}/> : <Login loginHandler={this.props.loginHandler}/>;
  }

  render() {
    return (
      <div className={"main"}>
        <Switch>
          <Route exact path="/" render={this.getLogin}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" render={this.getLogin}/>
          <Route path="/home" render={this.getLogin}/>
          <Route render={this.getLogin}/>
        </Switch>
      </div>
    );
  }
}