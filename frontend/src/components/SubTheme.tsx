import Link from "next/link";
import { useState } from "react";
import { useStore } from "../config/Store";
import SubThemeModel from "../models/SubThemeModel.model";
import styles from "../styles/SubTheme.module.css";
import ActionMenu from "./view/ActionsMenu";
import { hashIcon, moreIcon } from "./view/Icons";

interface SubThemeProps {
	url: string;
	subTheme: SubThemeModel;
}

export default function SubTheme(props: SubThemeProps) {
	const [contextMenuOptions, setContextMenuOptions] = useState({
		visible: false,
		x: 0,
		y: 0
	});
	const { setCurrentSubThemeId } = useStore();

	return (
		<li className={styles.subTheme}>
			<Link
				href={props.url}>
				{hashIcon} | {props.subTheme.name}
			</Link>
			<i onClick={(e) => {
				setContextMenuOptions({visible: true, x: e.pageX, y: e.pageY});
				setCurrentSubThemeId(props.subTheme.id);
			}}>
				{moreIcon}
			</i>
			{contextMenuOptions.visible ? (
				<ActionMenu
					bgColor="#4d1f42"
					data={props.subTheme}
					mode="userSubThemes"
					position={{x: contextMenuOptions.x, y: contextMenuOptions.y}}
					setOptions={setContextMenuOptions}
				/>
			) : null}
		</li>
	)
}