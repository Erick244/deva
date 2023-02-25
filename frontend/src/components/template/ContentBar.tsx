import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useStore } from "../../config/Store";
import { errorMessage } from "../../config/Toastify";
import { baseApiUrl } from "../../global";
import styles from "../../styles/ContentBar.module.css";
import { editIcon, plusIcon, trashIcon } from "../view/Icons";

export default function ContentBar() {
	const [contentIsNull, setContentIsNull] = useState<boolean>(true);
	const { visibleContentBar, isAuthenticated, setCreateContentVisible, createContentVisible, setMode } = useStore();

	const router = useRouter();

	async function getSubTheme() {
		try {
			const resp = await axios.get(`${baseApiUrl}/userSubThemes/${router.query.subThemeId}`);
			const data = await resp.data;
			if (!data.content) {
				setContentIsNull(true);
			} else {
				setContentIsNull(false);
			}
		} catch (err) {
			router.push("/");
			errorMessage("Sub-Tema não encontrado");
		}
	}

	function genButtons() {
		if (contentIsNull) {
			return (
				<button className={styles.createButton} title="Criar conteúdo"
					onClick={() => {
						setCreateContentVisible(!createContentVisible);
						setMode("save");
					}}>
					<i>{plusIcon}</i>
				</button>
			)
		} else {
			return (
				<>
					<button className={styles.editButton} title="Editar conteúdo"
						onClick={() => {
							setCreateContentVisible(!createContentVisible)
							setMode("save");
						}}>
						<i>{editIcon}</i>
					</button>
					<button className={styles.deleteButton} title="Excluir conteúdo"
						onClick={() => {
							setCreateContentVisible(!createContentVisible)
							setMode("delete");
						}}>
						<i>{trashIcon}</i>
					</button>
				</>
			)
		}
	}

	useEffect(() => {
		if (isAuthenticated && router.query.subThemeId) getSubTheme();
	}, [router.query.subThemeId, isAuthenticated, createContentVisible])

	return (
		<div className={styles.containerContentBar}
			style={{ display: `${visibleContentBar ? "flex" : "none"}` }}
		>
			{router.query.subThemeId ? (
				<>
					{genButtons()}
				</>
			) : null}
		</div>
	)
}