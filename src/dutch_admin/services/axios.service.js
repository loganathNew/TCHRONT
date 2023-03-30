
import Status from '../components/layouts/Status.js';
import NoteDataService from './notes.service.js';


class AxiosDataService {

    typeSwitch(type) {
        switch (type) {
            case 'notes':
                return NoteDataService;
            default:
                return 'foo';
        }
    }

    create(data, type) {
        this.typeSwitch(type).create(data)
            .then(response => {
                // console.log(response);
                return response;
            })
            .catch(e => {
                console.log(e);
                return "error";
            });
    }
}

export default new AxiosDataService();
