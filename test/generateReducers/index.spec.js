import generateReducers from 'generateReducers';
import exampleModel from '../__mocks__/rootReducer/exampleModel';

describe('generateReducers', () => {
  it('should have a reducer', () => {
    const reducers = generateReducers([exampleModel]);
    expect(reducers).toMatchSnapshot();
  });
});
