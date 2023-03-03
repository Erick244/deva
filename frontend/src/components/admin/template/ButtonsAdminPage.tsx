import { useStore } from "../../../config/Store";
import styles from "../../../styles/ButtonsAdminPage.module.css";
import { leftAngleIcon, rightAngleIcon } from "../../view/Icons";

interface ButtonsAdminPageProps {
	count: number;
	limit: number;
}

export default function ButtonsAdminPage(props: ButtonsAdminPageProps) {
	const { adminPageIndex, setAdminPageIndex } = useStore();

	return (
		<div className={styles.containerButtons}>
			<button 
				className={styles.previousButton} 
				disabled={adminPageIndex <= 1}
				onClick={() => setAdminPageIndex(adminPageIndex - 1)}
			>
				<i>{leftAngleIcon}</i>
			</button>
			<button 
				className={styles.nextButton}
				disabled={(props.count / props.limit) <= adminPageIndex}
				onClick={() => setAdminPageIndex(adminPageIndex + 1)}
			>
				<i>{rightAngleIcon}</i>
			</button>
		</div>
	)
}