import rootReducer from '../__mocks__/rootReducer';
import rootSaga from '../__mocks__/rootSaga';
import { configStore } from 'store';

describe('store', () => {
  it('should have a store', () => {

    const { store, persistor }  = configStore({rootReducer, rootSaga});
    expect(store).toMatchSnapshot();
    expect(persistor).toMatchSnapshot();
  });
});
