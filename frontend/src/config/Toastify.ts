import { toast } from "react-toastify";

export function errorMessage(msg: string) {
	toast(msg, {
		autoClose: 3000,
		type: "error",
		theme: "colored"
	})
}

export function successMessage(msg: string) {
	toast(msg, {
		autoClose: 3000,
		type: "success",
		theme: "colored"
	})
}