import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import CategoryModel from "../../models/Category.model";
import styles from "../../styles/Aside.module.css";
import Category from "../Category";
import { menuIcon, plusIcon } from "../view/Icons";

interface AisdeProps {
	hideMenuIcon: boolean;
}

export default function Aside(props: AisdeProps) {
	const { visibleMenu, setVisibleMenu } = useStore();
	const [categories, setCategories] = useState<JSX.Element[]>([] as JSX.Element[]);
	const { user, categoryFormVisible, setCategoryFormVisible, isAuthenticated, setCurrentCategoryId, currentCategoryId, updatedCategory } = useStore();
	const router = useRouter();
	const { get } = useCrud();

	function genCategoriesComponents(data: CategoryModel[]) {
		const categories = data.map((category: CategoryModel, i: number) => {
			if (!currentCategoryId) setCurrentCategoryId(category.id);
			return (<Category
				key={i}
				imageUrl={category.imageUrl}
				categoryName={category.name}
				onClick={() => {
					setCurrentCategoryId(category.id);
					router.push(`/category/${category.id}`);
				}}
			/>)
		})
		setCategories(categories);
	}

	useEffect(() => {
		if (isAuthenticated) {
			get("userCategories", data => {
				genCategoriesComponents(data);
			})	
		}
	}, [categoryFormVisible, isAuthenticated, user.id, updatedCategory])

	return (
		<aside className={styles.aside}>
			<div
				className={styles.openMenu}
				style={{ display: `${visibleMenu || props.hideMenuIcon ? "none" : "block"}` }}
				onClick={() => setVisibleMenu(true)}
			>
				<i>{menuIcon}</i>
			</div>
			<div className={styles.containerCategories}>
				<div className={styles.addCategoryButton} onClick={() => setCategoryFormVisible(true)}>
					<i>{plusIcon}</i>
				</div>
				<hr />
				<>
					{categories}
				</>
			</div>
		</aside>
	)
}