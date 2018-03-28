import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configStore } from './store';
import InitialPage from './page/InitialPage';

export function appCreator(component, { rootReducer, rootSaga }) {
  const { store, persistor } = configStore({ rootReducer, rootSaga });
  const Start = () => (component);
  return () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <InitialPage><Start /></InitialPage>
      </PersistGate>
    </Provider>
  );
}
