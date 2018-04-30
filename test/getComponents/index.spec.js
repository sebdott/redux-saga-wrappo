import React, { Component } from 'react';
import { mount } from 'enzyme';
import getComponents from 'getComponents';
import registerAllComponent from 'registerAllComponent';
import main from '../__mocks__/client/main';
import override from '../__mocks__/client/override';

describe('getComponents', () => {
  it('should have place only empty value', () => {
    const ExamplePage = getComponents({}, ['assets']);
    expect(ExamplePage).toBe(null);
  });
});

describe('getComponents', () => {
  it('should have place only main value', () => {
    const MainComponentRendered = registerAllComponent(main);

    class Example extends Component {
      render() {
        const { main: Main } = this.props.assets;
        return <Main />;
      }
    }

    const ExamplePage = getComponents(MainComponentRendered, ['assets'])(Example);
    expect(mount(<ExamplePage />)).toMatchSnapshot();
    expect(mount(<ExamplePage />).contains(<div>Test Main</div>)).toBe(true);
  });
});

describe('getComponents', () => {
  it('should have place only override value', () => {
    const MainComponentRendered = registerAllComponent(main, override);

    class Example extends Component {
      render() {
        const { main: Main } = this.props.assets;
        return <Main />;
      }
    }

    const ExamplePage = getComponents(MainComponentRendered, ['assets'])(Example);
    expect(mount(<ExamplePage />)).toMatchSnapshot();
    expect(mount(<ExamplePage />).contains(<div>Test Override</div>)).toBe(true);
  });
});
