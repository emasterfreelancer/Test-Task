import * as types from './actionTypes';
//import { toastMessage } from '../helper/toastMessage';

// export function showGlobalLoader() {

//   return {
//     type: types.GLOBAL_LOADER, 
//     status: true,
//   };
// }

export function showGlobalLoaderRes(data) {  
  return {
    type: types.GLOBAL_LOADER_RES, 
    data,
  };
}

export function showGlobalLoader(data) {
  return function(dispatch) {
    dispatch(showGlobalLoaderRes(data));
  };
}
