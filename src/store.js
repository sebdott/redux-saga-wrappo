import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as formModel } from 'redux-form';
import innerReducer from './reducers';
import history from './history';

function getStoreInfo({ rootReducer }) {
  const sagaMiddleware = createSagaMiddleware();

  const reducer = persistReducer(
    {
      key: 'rdc',
      storage,
      whitelist: ['appModel'],
    },
    combineReducers({
      ...rootReducer,
      router: routerReducer,
      ...innerReducer,
      formModel,
    }),
  );

  const middleware = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    middleware.push(createLogger({ collapsed: true }));
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return { sagaMiddleware, reducer, middleware, composeEnhancers };
}

export const configStore = ({ rootReducer, rootSaga }) => {
  const initialState = {};

  const { sagaMiddleware, reducer, middleware, composeEnhancers } = getStoreInfo({ rootReducer, rootSaga });
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware),
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  if (rootSaga) {
    sagaMiddleware.run(rootSaga);
  }

  return {
    persistor: persistStore(store),
    store,
  };
};
