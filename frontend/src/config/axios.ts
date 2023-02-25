import axios from "axios";

const success = (res: any) => {
	return res;
}

const error = (err: any) => {
	if (400 === err.response.status && !window.location.pathname.includes('auth')) {
		return Promise.reject(err);
	}
}

axios.interceptors.response.use(success, error);