import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

export const handleError = (error) => {
    error && error.response && error.response.status == 401 ? 
        window.location.href='/login' :
        alert('Something went wrong!')
}

export const getAuth = () => {
    const token = localStorage.getItem('authentication');
    return token ? jwt_decode(token) : null;
}

export const logout = () => {
    localStorage.removeItem('authentication');
    window.location.href='/login'
}

export const handleToast = (message, type) => {
    const style = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
    switch(type) {
        case 'error': {
            toast.error(message, style);
            break;
        }
        case 'warn': {
            toast.warn(message, style);
            break;
        }
        case 'success': {
            toast.success(message, style);
            break;
        }
        case 'info': {
            toast.info(message, style);
            break;
        }
        default: {
            toast.error(message || 'Something went wrong!', style);
            break;
        }
    }
}

export const toastContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}