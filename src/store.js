import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {reducer as form} from 'redux-form';
import innerReducer from './reducers';
import history from './history';

function getStoreInfo({rootReducer, persistReducerList, middlewareAdd}) {
  const sagaMiddleware = createSagaMiddleware();

  const reducerPersistWhiteList = ['appModel'];

  if (persistReducerList) {
    reducerPersistWhiteList.push(...persistReducerList);
  }
  const reducer = persistReducer(
    {
      key: 'rdc',
      storage,
      whitelist: reducerPersistWhiteList,
    },
    combineReducers({
      ...rootReducer,
      ...innerReducer,
      router: routerReducer,
      form,
    }),
  );

  const middleware = [sagaMiddleware, routerMiddleware(history), ...middlewareAdd];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {sagaMiddleware, reducer, middleware, composeEnhancers};
}

export default ({rootReducer, rootSaga, persistReducerList, middlewareAdd}) => {
  const initialState = {};

  const {
    sagaMiddleware,
    reducer,
    middleware,
    composeEnhancers,
  } = getStoreInfo({rootReducer, rootSaga, persistReducerList, middlewareAdd});
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
