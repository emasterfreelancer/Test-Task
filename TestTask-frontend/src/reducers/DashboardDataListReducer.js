import * as types from '../action/actionTypes';
import initialState from './initialState';

//only user costumerUserAdd
export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.DO_DASHBOARDDATA_RES:
      return action.user
    default:
      return state
  }
}

