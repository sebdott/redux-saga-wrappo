import React from 'react';
import { shallow } from 'enzyme';
import registerAllComponent from 'registerAllComponent';
import main from '../__mocks__/client/main';
import override from '../__mocks__/client/override';


describe('registerAllComponent', () => {
  it('should have place only main value', () => {
    const MainComponentRendered = registerAllComponent(main);

    const { assets } = MainComponentRendered(['assets']);
    const { main: Main } = assets.Tag;

    expect(assets).toMatchSnapshot();
    expect(shallow(<Main />)).toMatchSnapshot();
    expect(shallow(<Main />).contains(<div>Test Main</div>)).toBe(true);
  });
});

describe('registerAllComponent', () => {
  it('negative test of only main value', () => {
    const MainComponentRendered = registerAllComponent({});

    const { assets } = MainComponentRendered(['assets']);

    expect(assets).toBe(null);
  });
});

describe('registerAllComponent', () => {
  it('should have place a correct override value', () => {
    const MainComponentRendered = registerAllComponent(main, override);

    const { assets } = MainComponentRendered(['assets']);
    const { main: Main } = assets.Tag;

    expect(assets).toMatchSnapshot();
    expect(shallow(<Main />)).toMatchSnapshot();
    expect(shallow(<Main />).contains(<div>Test Override</div>)).toBe(true);
  });
});
