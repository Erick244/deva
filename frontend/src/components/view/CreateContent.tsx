import { useEffect, useState } from "react";
import Editor from "./Editor";
import styles from "../../styles/CreateContent.module.css";
import { useStore } from "../../config/Store";
import { useRouter } from "next/router";
import SubThemeModel from "../../models/SubThemeModel.model";
import useCrud from "../../hooks/useCrud";

export default function CreateContent() {
	const [content, setContent] = useState<any>();
	const [subTheme, setSubTheme] = useState<SubThemeModel>({} as SubThemeModel);
	const { setCreateContentVisible, isAuthenticated, createContentVisible, mode } = useStore();
	const router = useRouter();
	const { get, update } = useCrud();

	useEffect(() => {
		if (isAuthenticated && router.query.subThemeId) {
			get(`userSubThemes/${router.query.subThemeId}`, data => {
				if (data.content) {
					const buf = Buffer.from(data.content.data);
					setContent(buf.toString());
				} else {
					setContent("");
				}
				setSubTheme(data);
			})
		}
	}, [isAuthenticated, router.query.subThemeId, createContentVisible])

	function saveContent() {
		const newSubTheme = { ...subTheme, content }
		update(newSubTheme, `userSubThemes/${newSubTheme.id}`, "Conteúdo atualizado com sucesso");
		setCreateContentVisible(false);
	}

	function deleteContent() {
		const newSubTheme = { ...subTheme, content: null }
		update(newSubTheme, `userSubThemes/${newSubTheme.id}`, "Conteúdo excluido com sucesso");
		setCreateContentVisible(false);
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