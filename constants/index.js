/**
 * @namespace constants
 * @desc App constants
 */
import { addOnActionTypeNaming } from '../addOnActionTypeNaming';
import { ReducerActionTypesInner } from './reducer';
export var ReducerActionTypes = addOnActionTypeNaming(ReducerActionTypesInner, true);