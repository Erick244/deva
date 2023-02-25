import axios from "axios";
import { useState, useEffect } from "react";
import { useStore } from "../config/Store";
import { baseApiUrl } from "../global";
import SubThemeModel from "../models/SubThemeModel.model";
import ThemeModel from "../models/Theme.model";
import styles from "../styles/Theme.module.css";
import ActionMenu from "./view/ActionsMenu";
import { arrowIcon, bookmarkIcon, plusIcon } from "./view/Icons";
import SubTheme from "../components/SubTheme";

interface ThemeProps {
	theme: ThemeModel;
	title: string;
	id?: number;
	onClick?: () => void;
}

export default function Theme(props: ThemeProps) {
	const [visibleSubThemes, setVisibleSubThemes] = useState<boolean>(false);
	const [subThemes, setSubThemes] = useState<React.ReactNode[]>([] as React.ReactNode[]);
	const [contextMenuOptions, setContextMenuOptions] = useState({
		visible: false,
		x: 0,
		y: 0
	});
	const { isAuthenticated, setSubThemeFormVisible, setCurrentThemeId, subThemeFormVisible, currentCategoryId, setCurrentSubThemeId, setMode } = useStore();

	async function getSubThemes() {
		const resp = await axios.get(`${baseApiUrl}/userSubThemes?themeId=${props.theme.id}`);
		const data = await resp.data;
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
		} else {
			setSubThemes(data);
		}
	}

	useEffect(() => {
		if (isAuthenticated && visibleSubThemes && currentCategoryId) getSubThemes();
		return () => setSubThemes([] as React.ReactNode[]);
	}, [isAuthenticated, subThemeFormVisible, currentCategoryId, props.theme.id, visibleSubThemes])

	return (
		<div
			className={styles.containerTheme}
			onClick={() => props.onClick?.()}
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
				<i className={styles.arrowIcon}
					style={{ transform: `${visibleSubThemes ? "rotate(90deg)" : "rotate(0)"}` }}
					onClick={() => {
						setVisibleSubThemes(!visibleSubThemes);
						setCurrentThemeId(props.theme.id);
					}}
				>
					{arrowIcon}
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
				{subThemes}
			</ul>
		</div>
	)
}