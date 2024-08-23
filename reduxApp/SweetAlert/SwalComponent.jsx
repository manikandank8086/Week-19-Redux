import Swal from 'sweetalert2';
import './SweetAlert.css'

const SwalComponent = ({ title, text, icon, confirmButtonText }) => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        customClass: {
            popup: 'swal-custom-popup',
            confirmButton: 'swal-custom-button'

        }
    });
};

export default SwalComponent;
