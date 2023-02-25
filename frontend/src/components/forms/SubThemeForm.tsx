import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../../config/Store";
import { errorMessage, successMessage } from "../../config/Toastify";
import { baseApiUrl } from "../../global";
import styles from "../../styles/Form.module.css";

export default function ThemeForm() {
	const [name, setName] = useState<string>("");
	const [label, setLabel] = useState<"Atualizar" | "Criar" | "Excluir">("Criar");
	const { setSubThemeFormVisible, currentThemeId, mode, currentSubThemeId, currentCategoryId } = useStore();
	const router = useRouter();

	function addSubTheme() {
		const subTheme = {
			name,
			themeId: currentThemeId
		}

		axios.post(`${baseApiUrl}/subThemes`, subTheme)
			.then(() => {
				setSubThemeFormVisible(false);
				successMessage(`Sub-Tema "${name}" criado com sucesso`);
			}).catch(err => errorMessage(err.response.data))
	}

	async function getSubTheme() {
		const resp = await axios.get(`${baseApiUrl}/userSubThemes/${currentSubThemeId}`);
		const data = await resp.data;
		if (mode === "save") {
			setLabel("Atualizar");
		} else {
			setLabel("Excluir");
		}
		setName(data.name);
	}

	async function submit() {
		const theme = {
			name,
			themeId: currentThemeId
		}

		if (mode === "save") {
			axios.patch(`${baseApiUrl}/userSubThemes/${currentSubThemeId}`, theme)
			.then(() => {
				setSubThemeFormVisible(false);
				successMessage(`Sub-Tema "${name}" atualizado com sucesso`);
			}).catch(err => errorMessage(err.response.data))
		} else {
			await axios.delete(`${baseApiUrl}/userSubThemes/${currentSubThemeId}`)
			.then(() => {
				setSubThemeFormVisible(false);
				successMessage(`Sub-Tema "${name}" excluido com sucesso`);
			}).catch(err => errorMessage(err.response.data))
			router.push(`/category/${currentCategoryId}`);
		}
	}

	useEffect(() => {
		if (currentSubThemeId) {
			getSubTheme();
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