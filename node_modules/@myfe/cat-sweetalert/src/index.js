import SweetAlert from './sweet';

let swalInstance;

function swal(type, config, callback) {
    swalInstance = swalInstance || SweetAlert.newInstance();
    swalInstance.show(type, config, callback);
};

export default {
    alert() {
        swal('alert', arguments)
    },
    confirm(config, callback) {
        swal('confirm', config, callback);  
    },
    prompt(config, callback) {
        swal('prompt', config, callback);
    }
};
