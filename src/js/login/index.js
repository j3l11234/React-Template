import React, { Component } from 'react';
import { shouldComponentUpdate } from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.state = {};
  }

  render() {
    return (
      <div className="login">
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/register" component={RegisterPage} />
    </App>
  </Router>
), document.getElementById('root-node'));