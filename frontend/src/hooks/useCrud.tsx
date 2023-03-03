import axios from "axios";
import { useRouter } from "next/router";
import { errorMessage, successMessage } from "../config/Toastify";
import { baseApiUrl } from "../global";
import FormData from "../models/FormData.model";

export default function useCrud() {
	const router = useRouter();

	const update = (data: FormData, url: string, msg: string) => {
		url = `${baseApiUrl}/${url}`;
		axios.patch(url, data)
			.then(() => {
				successMessage(msg);
			})
			.catch(err => errorMessage(err.response.data));
	}

	const create = async (data: FormData, url: string, msg?: string, callBack?: (data: any) => void) => {
		try {
			url = `${baseApiUrl}/${url}`;
			const resp = await axios.post(url, data);
			if (callBack) {
				const data = await resp.data;
				callBack(data);
			}
			if (msg) successMessage(msg);
		} catch (msg: any) {
			errorMessage(msg);
		}
	}

	const remove = (url: string, msg: string, catchCallBack?: () => void) => {
		url = `${baseApiUrl}/${url}`;
		axios.delete(url)
			.then(() => {
				successMessage(msg);
			}).catch(err => {
				catchCallBack?.();
				errorMessage(err.response.data);
			});
	}

	const get = async (url: string, callBack: (data: any) => void) => {
		try {
			url = `${baseApiUrl}/${url}`;
			const resp = await axios.get(url);
			const data = await resp.data;
			if (data) {
				callBack(data);
			}
		} catch (err: any) {
			router.push("/");
			errorMessage(err.response.data);
		}
		
	}

	return { update, create, remove, get };

}