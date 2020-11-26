import * as types from './actionTypes';
import dashboardCourseDataListApi from '../api/dashboardCourseDataListApi';

export function doDashboardCourseData(data) {

  return {
    type: types.DO_DASHBOARDCOURSEDATA,
    data
  };
}

export function doDashboardCourseDataRes(user) {  
  return {
    type: types.DO_DASHBOARDCOURSEDATA_RES, 
    user
  };
}

export function DataCourseDashboard(data) {
  return function(dispatch) {
    dashboardCourseDataListApi.doDashboardCourseData(data).then(res => {
      dispatch(doDashboardCourseDataRes(res));
    }).catch(error => {
      return error
    });
  };
}
