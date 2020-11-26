import { BASE_URL } from '../constants';

class dashboardCourseDataListApi {
    static doDashboardCourseData(data) {
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            let body = {
                method: 'GET',
                headers: ajaxRequestHeaders,
            }
            return fetch(BASE_URL + `/getCourses`, body).then(response => {
                if(response.status === 401) {
                    localStorage.clear()
                    window.location.href ='/'
                }
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }
}

export default dashboardCourseDataListApi;
