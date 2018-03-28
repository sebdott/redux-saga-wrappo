import { ReducerDefaultActionTypes } from './constants/reducer';

export function addOnActionTypeNaming(
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
        ] = `${actionTypesKey}_${innerActionTypesValue}`;
      }
    }
  }
  if (isReducer) {
    if (global.ActionType) {
      global.ActionType = { ...ActionTypes, ...global.ActionType };
    }
    else {
      global.ActionType = ActionTypes;
    }

    return global.ActionType;
  }
  return ActionTypes;
}
