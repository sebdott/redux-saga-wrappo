import configStore from 'store';
import rootReducer from '../__mocks__/rootReducer';
import rootSaga from '../__mocks__/rootSaga';

describe('store', () => {
  it('should have a store', () => {
    const {store, persistor} = configStore({
      rootReducer,
      rootSaga,      
      middlewareAdd: [],
    });
    expect(store).toMatchSnapshot();
    expect(persistor).toMatchSnapshot();
  });
});
