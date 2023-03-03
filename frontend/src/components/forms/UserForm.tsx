import { useState } from "react";
import Gravatar from "react-gravatar";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import styles from "../../styles/UserForm.module.css";

export default function UserForm() {
	const { user, setUserFormVisible, setUser } = useStore();
	const [name, setName] = useState<string>(user.name || "");
	const [imageUrl, setImageUrl] = useState<string>(user.imageUrl || "");
	const { update } = useCrud();

	const safeUpdate = async () => {
		const userFrom = {
			name,
			imageUrl
		}

		update(userFrom, "users", "Perfil atualizado com sucesso");

		setUserFormVisible(false);
		setUser({ ...user, name, imageUrl });
		localStorage.setItem("user", JSON.stringify({ ...user, name, imageUrl }));
	}

	return (
		<div className={styles.containerUserForm}>
			<form className={styles.userForm} autoComplete="off" onSubmit={e => e.preventDefault()}>
				<h1 className={styles.formTitle}>Perfil</h1>
				<hr />
				<div className={styles.areaForm}>
					<label htmlFor="imageUrl">Nome ou Apelido: </label>
					<input
						type="text"
						id="imageUrl"
						placeholder="Nome de usuário..."
						maxLength={30}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles.areaForm}>
					<label htmlFor="imageUrl">Imagem / GIF (Url): </label>
					<input
						type="url"
						id="imageUrl"
						placeholder="Foto do perfil..."
						maxLength={1000}
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>
				<div className={styles.userImage}>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt="Foto do usuário"
							width={100}
							height={100}
						/>
					) : (
						<Gravatar email={user?.email} />
					)}
				</div>
				<div className={styles.containerButtons}>
					<button className={styles.createButton} onClick={safeUpdate}>
						Salvar
					</button>
					<button className={styles.cancelButton} onClick={() => setUserFormVisible(false)}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}