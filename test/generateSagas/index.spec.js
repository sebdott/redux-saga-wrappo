import exampleSaga from '../__mocks__/rootSaga/exampleSaga';
import { generateSagas } from 'generateSagas';

describe('generateSagas', () => {
  it('should have sagas', () => {
    const sagas = generateSagas([exampleSaga]);
    expect(sagas).toMatchSnapshot();
  });
});

