import AdminHeader from "./template/AdminHeader";
import styles from "../../styles/AdminLayout.module.css";
import { useStore } from "../../config/Store";
import { useEffect } from  "react";
import Loading from "../view/Loading";

interface AdminLayoutProps {
	children: any;
	activePage: "users" | "categories" | "stats" | "themes" | "subThemes";
	getValues: () => void;
}

export default function AdminLayout(props: AdminLayoutProps) {
	const { adminLoading, isAuthenticated, valueFromTable, adminOrRedirect, adminPageIndex, updatedTable } = useStore();

	useEffect(() => {
		if (isAuthenticated) adminOrRedirect(() => props.getValues());
	}, [isAuthenticated, valueFromTable, adminPageIndex, updatedTable])

	return (
		<>
			{adminLoading ? <Loading /> : (
				<div className={styles.adminLayout}>
					<AdminHeader activePage={props.activePage} />
					<main className={styles.adminLayoutMain}>
						{props.children}
					</main>
				</div>
			)}
		</>

	)
}