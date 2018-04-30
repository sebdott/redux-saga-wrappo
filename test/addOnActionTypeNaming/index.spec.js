import addOnActionTypeNaming from 'addOnActionTypeNaming';
import rootReducer from '../__mocks__/rootReducer';
import rootSaga from '../__mocks__/rootSaga';

describe('addOnActionTypeNaming', () => {
  it('should have a addOnActionTypeNaming', () => {
    const ReducerActionTypes = addOnActionTypeNaming(
      rootReducer,
      true,
    );
    const SagaActionTypes = addOnActionTypeNaming(
      rootSaga,
      false,
    );

    expect(ReducerActionTypes).toMatchSnapshot();
    expect(SagaActionTypes).toMatchSnapshot();
  });
});
