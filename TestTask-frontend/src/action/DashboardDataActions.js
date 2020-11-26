import * as types from './actionTypes';
import dashboardDataListApi from '../api/dashboardDataListApi';

export function doDashboardData(data) {

  return {
    type: types.DO_DASHBOARDDATA,
    data
  };
}

export function doDashboardDataRes(user) {  
  return {
    type: types.DO_DASHBOARDDATA_RES, 
    user
  };
}

export function DataDashboard(data) {
  return function(dispatch) {
    dashboardDataListApi.doDashboardData(data).then(res => {
      dispatch(doDashboardDataRes(res));
    }).catch(error => {
      return error
    });
  };
}
