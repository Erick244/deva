import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import { foldersIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import Loading from "../../components/view/Loading";
import { useStore } from "../../config/Store";
import { baseApiUrl } from "../../global";
import Category from "../../models/Category.model";

export default function AdminUsers() {
	const [categories, setCategories] = useState<Category[]>([] as Category[]);
	
	async function getCategories() {
		const resp = await axios.get(`${baseApiUrl}/categories`);
		const data = await resp.data;
		setCategories(data);
	}

	return (
		<Layout title="Categorias" titleIcon={foldersIcon} cleanPage={true}>
			<AdminLayout activePage="categories" getValues={getCategories}>
				<AdminForm formMode="categories" />
				<AdminTable tableMode="categories" values={categories} />
			</AdminLayout>
		</Layout>
	)
}