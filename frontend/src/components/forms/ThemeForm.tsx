import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../config/Store";
import { errorMessage, successMessage } from "../../config/Toastify";
import { baseApiUrl } from "../../global";
import styles from "../../styles/Form.module.css";

export default function ThemeForm() {
	const [name, setName] = useState<string>("");
	const [label, setLabel] = useState<"Criar" | "Atualizar" | "Excluir">("Criar");
	const { setThemeFormVisible, currentCategoryId, currentThemeId, mode } = useStore();

	function addTheme() {
		const theme = {
			name,
			categoryId: currentCategoryId
		}

		axios.post(`${baseApiUrl}/themes`, theme)
			.then(() => {
				setThemeFormVisible(false);
				successMessage(`Tema "${name}" criado com sucesso`);
			}).catch(err => errorMessage(err.response.data))
	}

	async function getTheme() {
		const resp = await axios.get(`${baseApiUrl}/userThemes/${currentThemeId}`);
		const data = await resp.data;
		if (mode === "save") {
			setLabel("Atualizar");
		} else {
			setLabel("Excluir");
		}
		setName(data.name);
	}

	function submit() {
		const theme = {
			name,
			categoryId: currentCategoryId
		}

		if (mode === "save") {
			axios.patch(`${baseApiUrl}/userThemes/${currentThemeId}`, theme)
			.then(() => {
				setThemeFormVisible(false);
				successMessage(`Tema "${name}" atualizado com sucesso`);
			}).catch(err => errorMessage(err.response.data))
		} else {
			axios.delete(`${baseApiUrl}/userThemes/${currentThemeId}`)
			.then(() => {
				setThemeFormVisible(false);
				successMessage(`Tema "${name}" excluido com sucesso`);
			}).catch(err => errorMessage(err.response.data))
		}
	}

	useEffect(() => {
		if (currentThemeId) {
			getTheme();
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