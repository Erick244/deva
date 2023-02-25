import Image from "next/image";
import LoadingGif from "../../assets/gifs/loading.gif";
import styles from "../../styles/Loading.module.css";

export default function Loading() {
	return (
		<div className={styles.loading}>
			<Image alt="loading gif" src={LoadingGif} />
		</div>
	)
}