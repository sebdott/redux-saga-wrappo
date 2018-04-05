import exampleModel from '../__mocks__/rootReducer/exampleModel';
import { generateReducers } from 'generateReducers';

describe('generateReducers', () => {
  it('should have a reducer', () => {
    const reducers = generateReducers([exampleModel]);
    expect(reducers).toMatchSnapshot();
  });
});

