import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { render } from '../server/server';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <div>
        <h2>Signup</h2>
        <form method='POST' action='/signup'>
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password"></input>
          <input type='submit' value='Create User'></input>
         </form>
      </div>
    );
  }
}

render(<App />, document.querySelector('app'))
export default App;