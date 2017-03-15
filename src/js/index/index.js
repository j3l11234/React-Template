import React, { Component } from 'react';
import { shouldComponentUpdate } from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import HomePage from './containers/HomePage';
import FooPage from './containers/FooPage';
import BarPage from './containers/BarPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>Header</header>
        {this.props.children}
        <footer>Footer</footer>
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App>
      <Route exact path="/" component={HomePage}/>
      <Route path="/foo" component={FooPage} />
      <Route path="/bar" component={BarPage} />
    </App>
  </Router>
), document.getElementById('root-node'));