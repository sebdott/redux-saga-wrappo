/**
 * @namespace constants
 * @desc App constants
 */
import addOnActionTypeNaming from '../addOnActionTypeNaming';
import { ReducerActionTypesInner } from './reducer';


export const ReducerActionTypes = addOnActionTypeNaming(
  ReducerActionTypesInner,
  true,
);
