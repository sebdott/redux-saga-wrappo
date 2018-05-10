import {addReducerDefaultActionType} from './generateReducers';

export {default as connect} from './connect';
export {default as addOnActionTypeNaming} from './addOnActionTypeNaming';
export {default as generateReducers} from './generateReducers';
export {default as generateSagas} from './generateSagas';
export {default as registerAllComponent} from './registerAllComponent';
export {default as appCreator} from './appCreator';
export {default as getComponents} from './getComponents';
export {default as history} from './history';

export const helper = {
  addReducerDefaultActionType,
};
