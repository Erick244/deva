import { useStore } from "../../config/Store";
import styles from "../../styles/Main.module.css"; 
import CategoryForm from "../forms/CategoryForm";
import UserForm from "../forms/UserForm";
import ThemeForm from "../forms/ThemeForm";
import SubThemeForm from "../forms/SubThemeForm";
import CreateContent from "../view/CreateContent";

interface MainProps {
	children: any;
}

export default function Main(props: MainProps) {
	const { categoryFormVisible, userFormVisible, themeFormVisible, subThemeFormVisible, createContentVisible } = useStore();

	return (
		<main className={styles.main}>
			{categoryFormVisible ? (<CategoryForm />) : null}
			{userFormVisible ? (<UserForm />) : null}
			{themeFormVisible ? (<ThemeForm />) : null}
			{subThemeFormVisible ? (<SubThemeForm />) : null}
			{createContentVisible ? (<CreateContent />) : null}
			{props.children}
		</main>
	)
}