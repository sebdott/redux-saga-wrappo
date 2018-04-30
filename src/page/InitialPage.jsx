import React, { Component } from 'react';
import connect from '../connect';
import { getDeviceToken } from '../utils/validation';

class InitialPage extends Component {
  componentWillMount() {
    const { appModel } = this.props;
    getDeviceToken(deviceToken => {
      appModel.updateState({ deviceToken });
    });
  }

  render() {
    const { children } = this.props;
    return (<div>{ children }</div>);
  }
}

export default connect()(InitialPage);
