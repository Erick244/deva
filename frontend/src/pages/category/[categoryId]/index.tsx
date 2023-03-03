import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/view/Layout";
import { useStore } from "../../../config/Store";
import CategoryModel from "../../../models/Category.model";
import styles from "../../../styles/CategoryPage.module.css";
import DefaultCategoryImage from "../../../assets/imgs/default-category.png";
import { hashIcon, imageIcon, nameIcon } from "../../../components/view/Icons";
import Loading from "../../../components/view/Loading";
import useCrud from "../../../hooks/useCrud";

export default function UserCategory() {
	const router = useRouter();
	const [category, setCategory] = useState<CategoryModel>({} as CategoryModel);
	const [name, setName] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [id, setId] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const { isAuthenticated, updatedCategory, setUpdateCategory } = useStore();
	const { get, update, remove } = useCrud();

	useEffect(() => {
		if (isAuthenticated && router.query.categoryId) {
			get(`userCategories/${router.query.categoryId}`, data => {
				setCategory(data);
				setLoading(false);
			})
		}
	}, [isAuthenticated, router.query.categoryId, updatedCategory])

	useEffect(() => {
		setId(category.id);
		setName(category.name);
		setImageUrl(category.imageUrl || "");
	}, [category.id])

	function updateCategory() {
		const categoryForm = {
			name,
			imageUrl,
			userId: category.userId
		}

		setUpdateCategory(!updatedCategory);
		update(categoryForm, `userCategories/${category.id}`, "Categoria atualizada com sucesso");
	}

	async function removeCategory() {
		await router.push("/");
		setUpdateCategory(!updatedCategory);
		remove(`userCategories/${category.id}`, "Categoria excluida com sucesso", () => {
			router.push(`/category/${category.id}`);
		})
	}

	return (
		<Layout hideTitle={loading} cleanPage={loading}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.categoryPage}>
					<h1 className={styles.title}>
						Configurações da categoria &ldquo;{category.name}&rdquo;:
					</h1>
					<hr />
					<form className={styles.categoryPageForm} onSubmit={e => e.preventDefault()}>
						<div className={styles.areaForm}>
							<input
								type="text"
								id="categoryId"
								value={id || 0}
								disabled={true}
							/>
							<label htmlFor="categoryId">
								<i className="v-middle">{hashIcon}</i> | ID
							</label>
						</div>
						<div className={styles.areaForm}>
							<input
								type="text"
								id="categoryName"
								maxLength={30}
								required
								value={name || ""}
								onChange={e => setName(e.target.value)}
							/>
							<label htmlFor="categoryName">
								<i className="v-middle">{nameIcon}</i> | Nome
							</label>
						</div>
						<div className={styles.areaForm}>
							<input
								type="text"
								id="imageUrl"
								maxLength={1000}
								required
								value={imageUrl || ""}
								onChange={e => setImageUrl(e.target.value)}
							/>
							<label htmlFor="imageUrl">
								<i className="v-middle">{imageIcon}</i> | Imagem / GIF (Url)
							</label>
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
							<button className={styles.submitButton} onClick={updateCategory}>
								Atualizar
							</button>
							<button className={styles.cancelButton} onClick={removeCategory}>
								Excluir
							</button>
						</div>
					</form>
				</div>
			)}

		</Layout>
	)
}