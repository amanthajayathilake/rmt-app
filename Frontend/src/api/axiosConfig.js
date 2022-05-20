import axios from 'axios';

axios.defaults.baseURL = 'https://cool-elf-554701.netlify.app/';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    console.log(error.config.url)
    error.config.url !== '/login' && (window.location.href = '/login');
   }
   return error;
 });

 export default axios;