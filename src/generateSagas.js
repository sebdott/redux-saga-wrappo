import {all, takeLatest, fork} from 'redux-saga/effects';
import map from 'lodash-es/map';

function* generateSagaInd({sagas}) {
  return yield fork(function* root() {
    const sagasList = [];
    if (sagas) {
      for (const [key] of Object.entries(sagas)) {
        sagasList.push(yield takeLatest(key, sagas[key]));
      }
    }
    return yield all(sagasList);
  });
}

export default function generateSagas(sagasList) {
  const fullSagaList = [];

  map(sagasList, saga => {
    fullSagaList.push(generateSagaInd(saga));
  });
  return function* root() {
    yield all(fullSagaList);
  };
}
