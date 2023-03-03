import { useState, useEffect } from "react";
import { useStore } from "../../../config/Store";
import useCrud from "../../../hooks/useCrud";
import FormData from "../../../models/FormData.model";
import styles from "../../../styles/AdminForm.module.css";
import Editor from "../../view/Editor";
import { arrobaIcon, confirmPasswordIcon, hashIcon, imageIcon, nameIcon, passwordIcon, shieldIcon } from "../../view/Icons";

interface AdminFormProps {
	formMode: "users" | "categories" | "themes" | "subThemes";
}

export default function AdminForm(props: AdminFormProps) {
	const { valueFromTable, setValueFromTable, setUpdateTable, updatedTable } = useStore();
	const [placeholderMode, setPlaceholderMode] = useState<string>("");
	const [buttonLabel, setButtonLabel] = useState<"Criar" | "Excluir" | "Atualizar">("Criar");
	const [content, setContent] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [admin, setAdmin] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>("");
	const [userId, setUserId] = useState<number>(0);
	const [categoryId, setCategoryId] = useState<number>(0);
	const [themeId, setThemeId] = useState<number>(0);
	const disable = valueFromTable.formAction === "delete" ? true : false;

	const { update, create, remove } = useCrud();

	const setValues = () => {
		if (Array.from(Object.values(valueFromTable)).length === 0) {
			reset();
			return;
		} else {
			setName(valueFromTable.name);
			setEmail(valueFromTable.email || "");
			setAdmin(valueFromTable.admin || false);
			setImageUrl(valueFromTable.imageUrl || "");
			setContent(valueFromTable.content || "");
			setCategoryId(valueFromTable.categoryId || 0);
			setUserId(valueFromTable.userId || 0);
			setThemeId(valueFromTable.themeId || 0)

			switch (valueFromTable.formAction) {
				case "delete":
					setButtonLabel("Excluir");
					break;
				case "update":
					setButtonLabel("Atualizar");
					break;
				case "post":
					setButtonLabel("Criar");
					break;
			}
		}
	}

	useEffect(() => {
		setValues();
	}, [valueFromTable])

	useEffect(() => {
		reset();
	}, [props.formMode])

	const reset = () => {
		setName("");
		setEmail("");
		setAdmin(false);
		setImageUrl("");
		setUserId(0);
		setCategoryId(0);
		setThemeId(0);
		setContent("");
		setButtonLabel("Criar");
		setPassword("");
		setConfirmPassword("");
		setValueFromTable({
			name: "",
			formAction: "post"
		});
	}

	const submit = async () => {
		const data: FormData = {
			name,
			email,
			password,
			confirmPassword,
			content: content.toString(),
			imageUrl,
			userId,
			categoryId,
			themeId,
			admin
		}

		for (let key in data) {
			if (!data[key as keyof FormData]) delete data[key as keyof FormData];
		}

		switch (valueFromTable.formAction) {
			case "delete":
				remove(`${props.formMode}/${valueFromTable.id}`, "Excluisão realizada com sucesso.");
				break;
			case "post" || undefined:
				create(data, `${props.formMode}`, "Criação realizada com sucesso.");
				break;
			case "update":
				update(data, `${props.formMode}/${valueFromTable.id}`, "Atualização realizada com sucesso.");
				break;
		}
		setUpdateTable(!updatedTable);
		reset();
	}

	useEffect(() => {
		switch (props.formMode) {
			case "users":
				setPlaceholderMode("do usuário...");
				break;
			case "categories":
				setPlaceholderMode("da categoria...");
				break;
			case "themes":
				setPlaceholderMode("do tema...");
				break;
			case "subThemes":
				setPlaceholderMode("do sub-tema...");
				break;
		}
	}, [])

	return (
		<form className={styles.adminForm} autoComplete="off" onSubmit={e => e.preventDefault()}>
			{valueFromTable.id ? (
				<div className={styles.areaForm}>
					<label htmlFor="id">
						<i className="v-middle">{hashIcon}</i> ID:
					</label>
					<input type="text" id="id" disabled value={valueFromTable.id} />
				</div>
			) : null}
			<div className={styles.areaForm}>
				<label htmlFor="name">
					<i className="v-middle">{nameIcon}</i> Nome:
				</label>
				<input
					type="text"
					id="name"
					placeholder={`Nome ${placeholderMode}`}
					maxLength={30}
					onChange={e => setName(e.target.value)}
					value={name}
					disabled={disable}
				/>
			</div>
			{props.formMode === "users" ? (
				<>
					<div className={styles.areaForm}>
						<label htmlFor="email">
							<i className="v-middle">{arrobaIcon}</i> E-mail:
						</label>
						<input
							type="email"
							id="email"
							placeholder="E-mail do usuário..."
							onChange={e => setEmail(e.target.value)}
							value={email}
							disabled={disable}
						/>
					</div>
					{valueFromTable.formAction === "post" || undefined ? (
						<>
							<div className={styles.areaForm}>
								<label htmlFor="password">
									<i className="v-middle">{passwordIcon}</i> Senha:
								</label>
								<input
									type="password"
									id="password"
									placeholder="Senha do usuário..."
									onChange={e => setPassword(e.target.value)}
									value={password}
									disabled={disable}
								/>
							</div>
							<div className={styles.areaForm}>
								<label htmlFor="confirmPassword">
									<i className="v-middle">{confirmPasswordIcon}</i> Confirmação da Senha:
								</label>
								<input
									type="password"
									id="confirmPassword"
									placeholder="Confimração de senha do usuário..."
									onChange={e => setConfirmPassword(e.target.value)}
									value={confirmPassword}
									disabled={disable}
								/>
							</div>
						</>
					) : null}

					<div className={`${styles.areaForm} ${styles.adminCheckbox}`}>
						<label htmlFor="admin">
							<i className="v-middle">{shieldIcon}</i> Admin:
						</label>
						<input
							type="checkbox"
							name="admin"
							id="admin"
							onChange={() => setAdmin(!admin)}
							checked={admin ? true : false}
							disabled={disable}
						/>
					</div>
				</>
			) : null}
			{props.formMode === "users" || props.formMode === "categories" ? (
				<div className={styles.areaForm}>
					<label htmlFor="imageUrl">
						<i className="v-middle">{imageIcon}</i> Imagem (Url):
					</label>
					<input
						type="url"
						id="imageUrl"
						placeholder={`Imagem ${placeholderMode}`}
						maxLength={1000}
						onChange={e => setImageUrl(e.target.value)}
						value={imageUrl}
						disabled={disable}
					/>
				</div>
			) : null}
			{props.formMode === "categories" ? (
				<div className={styles.areaForm}>
					<label htmlFor="userId">
						<i className="v-middle">{hashIcon}</i> ID do Usuário:
					</label>
					<input
						type="number"
						id="userId"
						placeholder="ID do usuário..."
						onChange={e => setUserId(+e.target.value)}
						value={userId}
						disabled={disable}
					/>
				</div>
			) : null}
			{props.formMode === "themes" ? (
				<div className={styles.areaForm}>
					<label htmlFor="categoryId">
						<i className="v-middle">{hashIcon}</i> ID da Categoria:
					</label>
					<input
						type="number"
						id="categoryId"
						placeholder="ID da categoria..."
						min={1}
						onChange={e => setCategoryId(+e.target.value)}
						value={categoryId}
						disabled={disable}
					/>
				</div>
			) : null}
			{props.formMode === "subThemes" ? (
				<>
					<div className={styles.areaForm}>
						<label htmlFor="themeId">
							<i className="v-middle">{hashIcon}</i> ID do Tema:
						</label>
						<input
							type="number"
							id="themeId"
							placeholder="ID do tema..."
							min={1}
							onChange={e => setThemeId(+e.target.value)}
							value={themeId}
							disabled={disable}
						/>
					</div>
					<hr />
					<div className={styles.textEditor}>
						<Editor
							placeholder="Conteúdo do sub-tema..."
							value={content}
							onChange={setContent}
							disabled={disable}
						/>
					</div>
				</>
			) : null}
			<div className={styles.containerButtons}>
				<button className={styles.submit} onClick={submit}>
					{buttonLabel}
				</button>
				<button className={styles.cancel} onClick={reset}>
					Limpar
				</button>
			</div>
		</form>
	)
}