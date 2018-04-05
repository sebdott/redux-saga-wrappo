import { ReducerActionTypes } from '../constants';

const INITIAL_STATE = {
  initialValue: '',
  somethingNew: '',
};

export default {
  namespace: ReducerActionTypes.exampleModel,
  state: INITIAL_STATE,
  reducer: {
    [ReducerActionTypes.exampleModel.Other_Reducer](state) {
      return { ...state };
    },
  },
};
