import Image from "next/image";
import { useState } from "react";
import DefaultCategoryImage from "../../assets/imgs/default-category.png"
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import styles from "../../styles/Form.module.css";

export default function CategoryForm() {
	const [name, setName] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const { setCategoryFormVisible } = useStore();
	const { create } = useCrud();

	function addCategory() {
		const category = {
			name,
			imageUrl
		}

		create(category, "categories", `Categoria "${name}" criada com sucesso`);
		setCategoryFormVisible(false);
	}

	return (
		<div className={styles.containerForm}>
			<form className={styles.form} autoComplete="off" onSubmit={e => e.preventDefault()}>
				<h1 className={styles.formTitle}>Criar Categoria</h1>
				<hr />
				<div className={styles.areaForm}>
					<label htmlFor="categoryName">Nome: </label>
					<input
						type="text"
						id="categoryName"
						placeholder="Nome da categoria..."
						maxLength={30}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles.areaForm}>
					<label htmlFor="imageUrl">Imagem / GIF (Url): </label>
					<input
						type="url"
						id="imageUrl"
						placeholder="Imagem da categoria..."
						maxLength={1000}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>
				<div className={styles.categoryImage}>
					{imageUrl ? (
						<img 
							src={imageUrl}
							alt="Imagem da categorya"
							width={100}
							height={100}
						/>
					) : (
						<Image
							src={DefaultCategoryImage.src}
							alt="Imagem da categoria"
							width={100}
							height={100}
						/>
					)}
				</div>
				<div className={styles.containerButtons}>
					<button className={styles.createButton} onClick={addCategory}>
						Criar
					</button>
					<button className={styles.cancelButton} onClick={() => setCategoryFormVisible(false)}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}