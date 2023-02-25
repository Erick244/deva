import { useEffect, useState } from "react";
import Editor from "./Editor";
import styles from "../../styles/CreateContent.module.css";
import { useStore } from "../../config/Store";
import { useRouter } from "next/router";
import axios from "axios";
import { baseApiUrl } from "../../global";
import SubThemeModel from "../../models/SubThemeModel.model";
import { errorMessage, successMessage } from "../../config/Toastify";

export default function CreateContent() {
	const [content, setContent] = useState<any>();
	const [subTheme, setSubTheme] = useState<SubThemeModel>({} as SubThemeModel);
	const { setCreateContentVisible, isAuthenticated, createContentVisible, mode } = useStore();
	const router = useRouter();

	async function getSubTheme() {
		const resp = await axios.get(`${baseApiUrl}/userSubThemes/${router.query.subThemeId}`);
		const data = await resp.data;
		setSubTheme(_ => {
			if (data.content) {
				const buf = Buffer.from(data.content.data);
				setContent(buf.toString());
			} else {
				setContent("");
			}
			return data;
		});
	}

	useEffect(() => {
		if (isAuthenticated && router.query.subThemeId) getSubTheme();
	}, [isAuthenticated, router.query.subThemeId, createContentVisible])

	function saveContent() {
		const data = { ...subTheme, content }
		axios.patch(`${baseApiUrl}/userSubThemes/${data.id}`, data)
			.then(_ => {
				successMessage("Conteúdo atualizado com sucesso");
				setCreateContentVisible(false);
			}).catch(err => errorMessage(err.response.data))
	}

	function deleteContent() {
		const data = { ...subTheme }
		data.content = null;
		axios.patch(`${baseApiUrl}/userSubThemes/${data.id}`, data)
			.then(_ => {
				successMessage("Conteúdo excluido com sucesso");
				setCreateContentVisible(false);
			}).catch(err => errorMessage(err.response.data))
	}


	return (
		<div className={styles.containerEditor}>
			<Editor disabled={mode === "delete" ? true : false} onChange={setContent} value={content} />
			<div className={styles.containerButtons}>
				<button className={styles.createButton} onClick={() => {
					if (mode === "delete") {
						deleteContent();
					} else {
						saveContent();
					}
				}}>
					{mode === "delete" ? "Excluir" : "Enviar"}
				</button>
				<button className={styles.cancelButton} onClick={() => setCreateContentVisible(false)}>
					Cancelar
				</button>
			</div>
		</div>
	)
}