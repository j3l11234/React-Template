import React, { Component } from 'react';
import { shouldComponentUpdate } from 'react/lib/ReactComponentWithPureRenderMixin';

import Alert from '../../common/components/Alert';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="index-index">
        HomePage
        <Alert text="simple alert text"/>
      </div>
    );
  }
}

export default HomePage;