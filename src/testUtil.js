
import React, { Component } from 'react';

export function testUtil() {
  return 'This is a test utils';
}

export class Landing extends Component {
  componentWillMount() {
    console.log('this is omponenssstWillMountsssssss');
  }

  render() {
    return <div>This is a test utils</div>;
  }
}
