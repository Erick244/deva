import { useEffect, useState } from "react";
import { gearIcon, logoutIcon, moonIcon, shieldIcon, sunIcon } from "../view/Icons";
import styles from "../../styles/Settings.module.css";
import Link from "next/link";
import { useStore } from "../../config/Store";
import useColorTheme from "../../hooks/useColorTheme";

export default function Settings() {
	const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	const { user } = useStore();
	const { alternateTheme } = useColorTheme();

	return (
		<div className={styles.settings}>
			<i className={`${showMenuDropdown ? styles.iconAnimation : styles.icon}`}
				onClick={() => setShowMenuDropdown(!showMenuDropdown)}
			>
				{gearIcon}
			</i>
			<div className={`${styles.menuDropdown} 
				${showMenuDropdown ? styles.showMenu : styles.hiddenMenu}
			`}>
				<div className={styles.themeButton}
					onClick={() => {
						alternateTheme();
						setTheme(`${theme === "dark" ? "light" : "dark"}`)
					}}
					style={{ backgroundColor: `${theme === "dark" ? "var(--color2)" : "transparent"}` }}
				>
					<i>{sunIcon}</i>
					<div className={styles.themeBall}
						style={{
							right: `${theme === "dark" ? "7px" : "35px"}`,
							backgroundColor: `${theme === "dark" ? "#fff" : "var(--color)"}`
						}}>
					</div>
					<i>{moonIcon}</i>
				</div>
				{user.admin ? (<Link href={"/admin"}>Administração <i>{shieldIcon}</i></Link>) : null}
				<Link href={"/auth"} onClick={() => localStorage.removeItem("user")}>Sair <i>{logoutIcon}</i></Link>
			</div>
		</div>
	)
}