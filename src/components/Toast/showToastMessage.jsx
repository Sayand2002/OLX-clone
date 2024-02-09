import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type, onCloseCallback) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: onCloseCallback
      });
      break;

    case 'error':
      toast.error(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;

    default:
      break;
  }
};

export default showToast;
