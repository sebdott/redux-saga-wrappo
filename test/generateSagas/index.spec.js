import generateSagas from 'generateSagas';
import exampleSaga from '../__mocks__/rootSaga/exampleSaga';

describe('generateSagas', () => {
  it('should have sagas', () => {
    const sagas = generateSagas([exampleSaga]);
    expect(sagas).toMatchSnapshot();
  });
});
