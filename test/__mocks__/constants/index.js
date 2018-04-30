/**
 * @namespace constants
 * @desc App constants
 */
import addOnActionTypeNaming from '../../../src/addOnActionTypeNaming';
import { ReducerActionTypesInner } from './Reducer';
import { SagaActionTypesInner } from './Saga';

export const ReducerActionTypes = addOnActionTypeNaming(
  ReducerActionTypesInner,
  true,
);
export const SagaActionTypes = addOnActionTypeNaming(
  SagaActionTypesInner,
  false,
);
