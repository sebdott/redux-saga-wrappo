/**
 * @module saga/exampleSaga
 * @desc exampleSaga
 */

import { SagaActionTypes } from '../constants';

const { TEST_SAGA } = SagaActionTypes.exampleSaga;

export default {
  sagas: {
    *[TEST_SAGA](){
        console.log("test saga");
      }
    },
};
