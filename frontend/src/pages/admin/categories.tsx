import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import ButtonsAdminPage from "../../components/admin/template/ButtonsAdminPage";
import { foldersIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import AdminData from "../../models/AdminData.model";

export default function AdminUsers() {
	const [categories, setCategories] = useState<AdminData>({} as AdminData);
	const { adminPageIndex } = useStore();
	const { get } = useCrud();

	function getCategories() {
		get(`categories?page=${adminPageIndex}`, data => {
			setCategories(data);
		})
	}

	return (
		<Layout title="Categorias" titleIcon={foldersIcon} cleanPage={true}>
			<AdminLayout activePage="categories" getValues={getCategories}>
				<AdminForm formMode="categories" />
				<AdminTable tableMode="categories" values={categories.data} />
				<ButtonsAdminPage count={categories.count} limit={categories.limit}/>
			</AdminLayout>
		</Layout>
	)
}