import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from './store';
import InitialPage from './page/InitialPage';

export default function appCreator(component, root, { rootReducer, rootSaga, persistReducerList }) {
  const { store, persistor } = configStore({ rootReducer, rootSaga, persistReducerList });
  const Start = () => (component);

  const App = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <InitialPage><Start /></InitialPage>
      </PersistGate>
    </Provider>
  );
  render(<App />, root);
}
