import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { foldersIcon, statsIcon, subThemeIcon, themeIcon, usersIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import useCrud from "../../hooks/useCrud";
import Stats from "../../models/Stats.model";
import styles from "../../styles/AdminStats.module.css";

export default function Admin() {
	const [stats, setStats] = useState<Stats>();
	const { get } = useCrud();

	function getStats() {
		try {
			get("stats", data => {
				setStats(data);
			})
		} catch (err) { }
	}

	return (
		<Layout cleanPage={true} title="Estatísticas" titleIcon={statsIcon}>
			<AdminLayout activePage="stats" getValues={getStats}>
				<div className={styles.adminStats}>
					<div className={styles.userStats}>
						{stats?.usersCount}
						<i>{usersIcon}</i>
					</div>
					<div className={styles.categoryStats}>
						{stats?.categoriesCount}
						<i>{foldersIcon}</i>
					</div>
					<div className={styles.themeStats}>
						{stats?.themesCount}
						<i>{themeIcon}</i>
					</div>
					<div className={styles.subThemeStats}>
						{stats?.subThemesCount}
						<i>{subThemeIcon}</i>
					</div>
				</div>
			</AdminLayout>
		</Layout>
	)
}