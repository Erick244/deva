import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import styles from "../../styles/Form.module.css";

export default function ThemeForm() {
	const [name, setName] = useState<string>("");
	const [label, setLabel] = useState<"Atualizar" | "Criar" | "Excluir">("Criar");
	const { setSubThemeFormVisible, currentThemeId, mode, currentSubThemeId, currentCategoryId } = useStore();
	const router = useRouter();
	const { create, get, update, remove } = useCrud();

	function addSubTheme() {
		const subTheme = {
			name,
			themeId: currentThemeId
		}

		create(subTheme, "subThemes", `Sub-Tema "${name}" criado com sucesso`);
		setSubThemeFormVisible(false);
	}

	async function submit() {
		const theme = {
			name,
			themeId: currentThemeId
		}

		const url = `userSubThemes/${currentSubThemeId}`;

		if (mode === "save") {
			update(theme, url, `Sub-Tema "${name}" atualizado com sucesso`);
			setSubThemeFormVisible(false);
		} else {
			remove(url, `Sub-Tema "${name}" excluido com sucesso`);
			setSubThemeFormVisible(false);
			router.push(`/category/${currentCategoryId}`);
		}
	}

	useEffect(() => {
		if (currentSubThemeId) {
			get(`userSubThemes/${currentSubThemeId}`, data => {
				if (mode === "save") {
					setLabel("Atualizar");
				} else {
					setLabel("Excluir");
				}
				setName(data.name);
			});
		} else {
			setName("");
		}

		return () => setName("");
	}, [currentSubThemeId])

	return (
		<div className={styles.containerForm}>
			<form className={styles.form} autoComplete="off" onSubmit={e => e.preventDefault()}>
				<h1 className={styles.formTitle}>{label} Sub-Tema</h1>
				<hr />
				<div className={styles.areaForm}>
					<label htmlFor="subThemeTitle">Titulo: </label>
					<input
						type="text"
						id="subThemeTitle"
						placeholder="Titulo do Sub-Tema..."
						maxLength={30}
						onChange={(e) => setName(e.target.value)}
						value={name}
						disabled={mode === "delete" ? true : false}
					/>
				</div>
				<div className={styles.containerButtons}>
					<button className={styles.createButton} onClick={currentSubThemeId ? submit : addSubTheme}>
						{label}
					</button>
					<button className={styles.cancelButton} onClick={() => setSubThemeFormVisible(false)}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}