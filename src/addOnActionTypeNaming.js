import { ReducerDefaultActionTypes } from './constants/reducer';

export default function addOnActionTypeNaming(
  ActionTypes,
  isReducer = false
) {
  for (const [actionTypesKey, actionTypesValue] of Object.entries(
    ActionTypes,
  )) {
    if (isReducer) {
      for (const [
        defaultActionTypesKey,
        defaultActionTypesValue,
      ] of Object.entries(ReducerDefaultActionTypes)) {
        ActionTypes[actionTypesKey][
          defaultActionTypesKey
        ] = defaultActionTypesValue;
      }
      ActionTypes[actionTypesKey].namespace = actionTypesKey;
    }

    for (const [innerActionTypesKey, innerActionTypesValue] of Object.entries(
      actionTypesValue,
    )) {
      if (innerActionTypesKey !== 'namespace') {
        ActionTypes[actionTypesKey][
          innerActionTypesKey
        ] = `${actionTypesKey}/${innerActionTypesValue}`;
      }
    }
  }
  if (isReducer) {
    if (window.ActionType) {
      window.ActionType = { ...ActionTypes, ...window.ActionType };
    }
    else {
      window.ActionType = ActionTypes;
    }
    return window.ActionType;
  }
  return ActionTypes;
}
