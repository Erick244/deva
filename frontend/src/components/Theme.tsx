import { useState, useEffect } from "react";
import { useStore } from "../config/Store";
import SubThemeModel from "../models/SubThemeModel.model";
import ThemeModel from "../models/Theme.model";
import styles from "../styles/Theme.module.css";
import ActionMenu from "./view/ActionsMenu";
import { rightAngleIcon, bookmarkIcon, plusIcon } from "./view/Icons";
import SubTheme from "../components/SubTheme";
import useCrud from "../hooks/useCrud";

interface ThemeProps {
	theme: ThemeModel;
	title: string;
	id?: number;
}

export default function Theme(props: ThemeProps) {
	const [visibleSubThemes, setVisibleSubThemes] = useState<boolean>(false);
	const [subThemes, setSubThemes] = useState<React.ReactNode[] | SubThemeModel[]>([] as React.ReactNode[]);
	const [contextMenuOptions, setContextMenuOptions] = useState({
		visible: false,
		x: 0,
		y: 0
	});
	const { isAuthenticated, setSubThemeFormVisible, setCurrentThemeId, subThemeFormVisible, currentCategoryId, setCurrentSubThemeId, setMode } = useStore();
	const { get } = useCrud();

	useEffect(() => {
		if (isAuthenticated && visibleSubThemes && currentCategoryId) {
			get(`userSubThemes?themeId=${props.theme.id}`, data => {
				genSubThemesComponents(data);
			})
		}
		return () => setSubThemes([] as React.ReactNode[]);
	}, [isAuthenticated, subThemeFormVisible, currentCategoryId, props.theme.id, visibleSubThemes])

	function genSubThemesComponents(data: SubThemeModel[]) {
		if (data.length != 0) {
			const subThemes = data.map((subTheme: SubThemeModel, i: number) => {
				return (
					<SubTheme
						url={`/category/${currentCategoryId}/theme/${props.theme.id}/subTheme/${subTheme.id}`}
						subTheme={subTheme}
						key={i}
					/>
				)
			})
			setSubThemes(subThemes);
		}
	}

	return (
		<div
			className={styles.containerTheme}
			onContextMenu={e => {
				e.preventDefault();
				setContextMenuOptions({
					visible: true,
					x: e.pageX,
					y: e.pageY
				});
				setCurrentThemeId(props.theme.id);
			}}
		>
			{contextMenuOptions.visible ? (
				<ActionMenu
					bgColor="#894379"
					data={props.theme}
					mode="userThemes"
					position={{ x: contextMenuOptions.x, y: contextMenuOptions.y }}
					setOptions={setContextMenuOptions}
				/>
			) : null}
			<div className={styles.theme}>
				<i className={styles.rightAngleIcon}
					style={{ transform: `${visibleSubThemes ? "rotate(90deg)" : "rotate(0)"}` }}
					onClick={() => {
						setVisibleSubThemes(!visibleSubThemes);
						setCurrentThemeId(props.theme.id);
					}}
				>
					{rightAngleIcon}
				</i>
				<div className={styles.themeLabel}>
					<i className={styles.bookmarkIcon}>{bookmarkIcon}</i>
					<span>| {props.title}</span>
					<i className={styles.plusIcon} onClick={() => {
						setMode("save");
						setCurrentThemeId(props.theme.id);
						setSubThemeFormVisible(true);
						setCurrentSubThemeId(0);
					}}>
						{plusIcon}
					</i>
				</div>
			</div>
			<ul className={styles.subThemes}
				style={{ display: `${visibleSubThemes ? "block" : "none"}` }}>
				{subThemes.length > 0 ? <>{subThemes}</> : null}
			</ul>
		</div>
	)
}