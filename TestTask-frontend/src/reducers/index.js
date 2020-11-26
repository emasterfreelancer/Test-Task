import {
  combineReducers
} from 'redux';
import {
  reducer as formReducer
} from 'redux-form';
import loaderReducer  from './loaderReducer';
import DashboardDataListReducer from './DashboardDataListReducer';
import DashboardCourseDataListReducer from './DashboardCourseDataListReducer';
import StateCollegeDataListReducer from './StateCollegeDataListReducer';


export default combineReducers({
  loading: loaderReducer,
  form: formReducer,
  DashboardCourseDataListRes : DashboardCourseDataListReducer,
  DashboardDataListRes: DashboardDataListReducer,
  StateCollegeDataListRes: StateCollegeDataListReducer,
  
});