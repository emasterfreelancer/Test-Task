import * as types from './actionTypes';
import stateCollegeDataListApi from '../api/stateCollegeDataListApi';

export function doStateCollegeData(data) {

  return {
    type: types.DO_STATECOLLEGEDATA,
    data
  };
}

export function doStateCollegeDataRes(user) {  
  return {
    type: types.DO_STATECOLLEGEDATA_RES, 
    user
  };
}

export function DataStateCollege(data) {
  return function(dispatch) {
    stateCollegeDataListApi.doStateCollegeData(data).then(res => {
      dispatch(doStateCollegeDataRes(res));
    }).catch(error => {
      return error
    });
  };
}
