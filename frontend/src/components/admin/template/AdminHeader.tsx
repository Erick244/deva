import Link from "next/link";
import styles from "../../../styles/AdminHeader.module.css";
import { foldersIcon, statsIcon, subThemeIcon, themeIcon, usersIcon } from "../../view/Icons";

interface AdminHeaderProps {
	activePage: "users" | "categories" | "stats" | "themes" | "subThemes";
}

export default function AdminHeader(props: AdminHeaderProps) {
	return (
		<header className={styles.adminHeader}>
			<Link href={"/admin/users"} className={`${props.activePage === "users" ? styles.active : null}`}>
				Usuários <i className="v-middle">{usersIcon}</i>
			</Link>
			<Link href={"/admin/categories"} className={`${props.activePage === "categories" ? styles.active : null}`}>
				Categorias <i className="v-middle">{foldersIcon}</i>
			</Link>
			<Link href={"/admin"} className={`${props.activePage === "stats" ? styles.active : null}`}>
				Stats <i className="v-middle">{statsIcon}</i>
			</Link>
			<Link href={"/admin/themes"} className={`${props.activePage === "themes" ? styles.active : null}`}>
				Temas <i className="v-middle">{themeIcon}</i>
			</Link>
			<Link href={"/admin/subThemes"} className={`${props.activePage === "subThemes" ? styles.active : null}`}>
				Sub-Temas <i className="v-middle">{subThemeIcon}</i>
			</Link>
		</header>
	)
}