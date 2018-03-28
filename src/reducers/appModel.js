import { ReducerActionTypes } from '../constants';

const INITIAL_STATE = {
  deviceToken: '',
};
export default {
  namespace: ReducerActionTypes.appModel,
  state: INITIAL_STATE,
  reducer: {},
};
