import { useEffect, useState } from "react";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import styles from "../../styles/Form.module.css";

export default function ThemeForm() {
	const [name, setName] = useState<string>("");
	const [label, setLabel] = useState<"Criar" | "Atualizar" | "Excluir">("Criar");
	const { setThemeFormVisible, currentCategoryId, currentThemeId, mode, setCurrentThemeId, setVisibleMenu } = useStore();
	const { create, get, remove, update } = useCrud();

	function addTheme() {
		const theme = {
			name,
			categoryId: currentCategoryId
		}

		create(theme, "themes", `Tema "${name}" criado com sucesso`);
		setThemeFormVisible(false);
	}

	function submit() {
		const theme = {
			name,
			categoryId: currentCategoryId
		}

		const url = `userThemes/${currentThemeId}`;

		if (mode === "save") {
			update(theme, url, `Tema "${name}" atualizado com sucesso`);
			setThemeFormVisible(false);
		} else {
			remove(url, `Tema "${name}" excluido com sucesso`);
			setThemeFormVisible(false);
			setVisibleMenu(false);
			setCurrentThemeId(0);
		}
	}

	useEffect(() => {
		if (currentThemeId) {
			get(`userThemes/${currentThemeId}`, data => {
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
	}, [currentThemeId])

	return (
		<div className={styles.containerForm}>
			<form className={styles.form} autoComplete="off" onSubmit={e => e.preventDefault()}>
				<h1 className={styles.formTitle}>{label} Tema</h1>
				<hr />
				<div className={styles.areaForm}>
					<label htmlFor="themeTitle">Titulo: </label>
					<input
						type="text"
						id="themeTitle"
						placeholder="Titulo do Tema..."
						maxLength={30}
						onChange={(e) => setName(e.target.value)}
						value={name}
						disabled={mode === "delete" ? true : false}
					/>
				</div>
				<div className={styles.containerButtons}>
					<button className={styles.createButton} onClick={currentThemeId ? submit : addTheme}>
						{label}
					</button>
					<button className={styles.cancelButton} onClick={() => setThemeFormVisible(false)}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}