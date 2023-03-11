import { useStore } from "../../config/Store";
import styles from "../../styles/Main.module.css";
import CategoryForm from "../forms/CategoryForm";
import UserForm from "../forms/UserForm";
import ThemeForm from "../forms/ThemeForm";
import SubThemeForm from "../forms/SubThemeForm";
import CreateContent from "../view/CreateContent";
import { useEffect, useState } from "react";

interface MainProps {
	children: any;
}

export default function Main(props: MainProps) {
	const { categoryFormVisible, userFormVisible, themeFormVisible, subThemeFormVisible, createContentVisible, visibleMenu } = useStore();
	const [hideContent, setHideContent] = useState<boolean>(false);
	const [windowWidth, setWindowWidth] = useState<number>(1200);

	if (typeof window !== "undefined") {
		window.onresize = (e: any) => {
			const innerWidth = e.currentTarget.innerWidth;
			setWindowWidth(innerWidth);
		}
	}

	useEffect(() => {
		windowWidth <= 768 && visibleMenu ? setHideContent(true) 
			: setHideContent(false);
	}, [visibleMenu])

	return (
		<main className={styles.main}>
			{categoryFormVisible ? (<CategoryForm />) : null}
			{userFormVisible ? (<UserForm />) : null}
			{themeFormVisible ? (<ThemeForm />) : null}
			{subThemeFormVisible ? (<SubThemeForm />) : null}
			{createContentVisible ? (<CreateContent />) : null}
			{hideContent ? null : (
				<>
					{props.children}
				</>
			)}
		</main>
	)
}