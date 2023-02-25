import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'
import "../config/axios";
import type { AppProps } from 'next/app'
import StoreProvider from '../config/Store'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<title>DevA</title>
			<StoreProvider>
				<ToastContainer />
				<Component {...pageProps} />
			</StoreProvider>
		</>

	)
}
