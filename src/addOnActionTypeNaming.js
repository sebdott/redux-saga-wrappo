export function addOnActionTypeNaming(
  ActionTypes,
  DefaultActionTypes,
  isReducer = false, 
) {
  for (const [actionTypesKey, actionTypesValue] of Object.entries(
    ActionTypes,
  )) {
    if (isReducer) {
      for (const [
        defaultActionTypesKey,
        defaultActionTypesValue,
      ] of Object.entries(DefaultActionTypes)) {
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
  return ActionTypes;
}
