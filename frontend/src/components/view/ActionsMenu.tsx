import SubThemeModel from "../../models/SubThemeModel.model";
import Theme from "../../models/Theme.model";
import styles from "../../styles/ActionMenu.module.css";
import React, { Dispatch, SetStateAction } from "react";
import { closeIcon, editIcon, trashIcon } from "./Icons";
import { useStore } from "../../config/Store";

interface ActionMenuProps {
	mode: "userThemes" | "userSubThemes";
	data: Theme | SubThemeModel;
	position: { x: number, y: number };
	setOptions: Dispatch<SetStateAction<{ x: number, y: number, visible: boolean }>>;
	bgColor: string;
}

export default function ActionMenu(props: ActionMenuProps) {
	const { setThemeFormVisible, setMode, setSubThemeFormVisible } = useStore();

	return (
		<div className={styles.actionMenu} style={{
			left: `${props.position.x}px`, top: `${props.position.y}px`, backgroundColor: `${props.bgColor}`
		}}>
			<i className={styles.closeMenu}
				onClick={() => props.setOptions({ x: 0, y: 0, visible: false })}>
				{closeIcon}
			</i>
			<h1>{props.data.name}</h1>
			<hr />
			<div className={styles.containerButtons}>
				<button className={styles.editButton} onClick={() => {
					setMode("save");
					if (props.mode === "userSubThemes") {
						setSubThemeFormVisible(true);
					} else {
						setThemeFormVisible(true);
					}
				}}>
					Editar <i>{editIcon}</i>
				</button>
				<button className={styles.deleteButton} onClick={() => {
					setMode("delete");
					if (props.mode === "userSubThemes") {
						setSubThemeFormVisible(true);
					} else {
						setThemeFormVisible(true);
					}
				}}>
					Excluir <i>{trashIcon}</i>
				</button>
			</div>
		</div>
	)
}