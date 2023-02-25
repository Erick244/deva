import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../../config/Store";
import { baseApiUrl } from "../../global";
import ThemeModel from "../../models/Theme.model";
import styles from "../../styles/Menu.module.css";
import Theme from "../Theme";
import { menuOpenIcon, plusIcon, searchIcon } from "../view/Icons";

export default function Menu() {
	const [themes, setThemes] = useState<any[]>([] as any[]);
	const [textSearch, setTextSearch] = useState<string>("");
	const { setVisibleMenu, visibleMenu, isAuthenticated, setThemeFormVisible, themeFormVisible, setCurrentThemeId, setMode } = useStore();
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	async function getThemes() {
		try {
			const resp = await axios.get(`${baseApiUrl}/userThemes?categoryId=${router.query.categoryId}`);
			const data = await resp.data;
			filterThemesBySearch(data);
			setLoading(false);
		} catch (err) {
			setVisibleMenu(false);
			return router.push("/");
		}
	}

	function filterThemesBySearch(themes: ThemeModel[]) {
		const themesFiltered = themes.filter(theme => theme.name.includes(textSearch));
		genThemesComponent(themesFiltered);
	}

	function genThemesComponent(themesFiltered: ThemeModel[]) {
		if (themesFiltered.length === 0) {
			setThemes([] as ThemeModel[]);
		} else {
			const themesComponents = themesFiltered.map((theme: ThemeModel, i: number) => {
				return <Theme key={i} title={theme.name} theme={theme} />
			})

			setThemes(themesComponents);
		}
	}

	useEffect(() => {
		if (isAuthenticated && visibleMenu && router.query.categoryId) getThemes();
		return () => setThemes([] as ThemeModel[]);
	}, [isAuthenticated, router.query.categoryId, themeFormVisible, visibleMenu, textSearch])

	return (
		<menu className={styles.menu}
			style={{ display: `${visibleMenu ? "block" : "none"}` }}
		>
			<div className={styles.interaction}>
				<div className={styles.search}>
					<label htmlFor="search">{searchIcon}</label>
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Procurar themas..."
						autoComplete="off"
						onChange={e => setTextSearch(e.target.value)}
					/>
				</div>
				<div className={styles.closeMenu} onClick={() => setVisibleMenu(false)}>
					<i>{menuOpenIcon}</i>
				</div>
			</div>
			<div className={styles.themes}>
				<>
					<div className={styles.createTheme} onClick={() => {
						setMode("save");
						setThemeFormVisible(true);
						setCurrentThemeId(0);
					}}>
						<i>{plusIcon}</i>
						<div>Novo Tema</div>
					</div>
					<>
						{themes.length == 0 && textSearch ? (
							<span className={styles.notFind}>Tema "{textSearch}" não encontrado.</span>
						) : (
							<>
								{themes}
							</>
						)}
					</>
				</>
			</div>
		</menu>
	)
}