import { omit, pick, map, extend, merge } from 'lodash-es';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

function generateReducerInd({
  namespace: actionTypeConstant,
  state: INITIAL_STATE,
  reducer: reducerExtendedObj,
}) {
  let reducerObj = {
    [`${actionTypeConstant.UPDATE_STATE}`](stateObj, { payload }) {
      return { ...stateObj, ...payload };
    },
    [`${actionTypeConstant.REMOVE_STATE}`](stateObj, { payload }) {
      const newState = omit(stateObj, payload);
      return { ...newState };
    },
    [`${actionTypeConstant.INITIALIZE_STATE}`](stateObj, { payload }) {
      const initialStates = pick(INITIAL_STATE, payload);
      return { ...stateObj, ...initialStates };
    },
    [`${actionTypeConstant.INITIALIZE_ALL}`](stateObj) {
      return { ...stateObj, ...INITIAL_STATE };
    },
  };

  if (reducerExtendedObj) {
    const reducerExtenderObjTemp = {};
    map(reducerExtendedObj, (implementation, name) => {
      reducerExtenderObjTemp[name] = implementation;
      reducerObj = extend(reducerObj, reducerExtenderObjTemp);
    });
  }
  return {
    [actionTypeConstant.namespace]: createReducer(INITIAL_STATE, reducerObj),
  };
}

export function generateReducers(reducerList) {
  const fullReducers = {};

  map(reducerList, reducer => {
    const reducerValue = generateReducerInd(reducer);
    const reducerName = Object.keys(reducerValue)[0];
    fullReducers[reducerName] = reducerValue[reducerName];
  });
  return fullReducers;
}

function generateReducerDefaultActionType(reducer) {
  function updateState(payload) {
    return {
      type: reducer.UPDATE_STATE,
      payload,
    };
  }

  function removeState(payload) {
    return {
      type: reducer.REMOVE_STATE,
      payload,
    };
  }

  function initializeState(payload) {
    return {
      type: reducer.INITIALIZE_STATE,
      payload,
    };
  }

  function initializeAll() {
    return {
      type: reducer.INITIALIZE_ALL,
    };
  }

  return { updateState, removeState, initializeState, initializeAll };
}

export function addReducerDefaultActionType(CurrentReducerActionTypes) {
  let defaultReducerActions = {};

  for (const [key, value] of Object.entries(window.ActionType)) {
    // const keyEdit = key.replace('Model', 'Reducer');
    defaultReducerActions[key] = generateReducerDefaultActionType(value);
  }

  if (CurrentReducerActionTypes) {
    defaultReducerActions = merge(
      CurrentReducerActionTypes,
      defaultReducerActions
    );
  }

  return { ...defaultReducerActions };
}

export default generateReducers;
