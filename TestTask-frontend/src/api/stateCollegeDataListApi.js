import { BASE_URL } from '../constants';

class stateCollegeDataListApi {
    static doStateCollegeData(data) {
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(data)
            }
            return fetch(BASE_URL + `/collegeByState`, body).then(response => {
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

export default stateCollegeDataListApi;
