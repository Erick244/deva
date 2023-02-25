import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/imgs/white-logo.png";
import styles from "../../styles/Header.module.css";
import Profile from "../userSettings/Profile";
import Settings from "../userSettings/Settings";

interface HeaderProps {
	title?: string;
	icon?: JSX.Element;
	hideTitle?: boolean;
}

export default function Header(props: HeaderProps) {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href={"/"}>
					<Image src={Logo} alt="Logo" priority={true}/>
				</Link>
			</div>
			<div className={styles.title} style={{ display: `${props.hideTitle ? "none" : "block"}` }}>
				<h1><i className="v-middle">{props.icon}</i> {props.title}</h1>
			</div>
			<div className={styles.userSettings}>
				<Settings />
				<Profile />
			</div>
		</header>
	)
}