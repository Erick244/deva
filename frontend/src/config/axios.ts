import axios from "axios";
import { errorMessage } from "./Toastify";

const success = (res: any) => {
	return res;
}

const error = (err: any) => {
	if (400 === err.response.status && !window.location.pathname.includes('auth')) {
		return Promise.reject(err);
	} else {
		errorMessage(err.response.data);
	}
}

axios.interceptors.response.use(success, error);