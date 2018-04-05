import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ReducerActionTypes
 * @memberof Constants
 */

export const ReducerActionTypesInner = {
  exampleModel: keyMirror({
    Other_Reducer: undefined,
  }),
  themeModel: keyMirror({
    Other_Reducer: undefined,
  }),
  userModel: keyMirror({
    Other_Reducer: undefined,
  }),
  appModel: {},
  formModel: {},
};
/**
 * @constant {Object} ReducerDefaultActionTypes
 * @memberof Constants
 */

export const ReducerDefaultActionTypes = keyMirror({
  UPDATE_STATE: undefined,
  REMOVE_STATE: undefined,
  INITIALIZE_STATE: undefined,
  INITIALIZE_ALL: undefined,
});
