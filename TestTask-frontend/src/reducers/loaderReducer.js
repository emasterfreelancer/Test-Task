import * as types from '../action/actionTypes'; 
import initialState from './initialState';


//all the user related reducers here
export default function (state = initialState.user, action) { //we will change the state = {} soon
  switch(action.type) {
    case types.GLOBAL_LOADER_RES:
      return action.data
    default:
      return state
  }
}