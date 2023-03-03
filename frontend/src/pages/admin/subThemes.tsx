import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import ButtonsAdminPage from "../../components/admin/template/ButtonsAdminPage";
import { subThemeIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import AdminData from "../../models/AdminData.model";

export default function AdminUsers() {
	const [subThemes, setSubThemes] = useState<AdminData>({} as AdminData);
	const { adminPageIndex } = useStore();
	const { get } = useCrud();

	function getSubThemes() {
		get(`subThemes?page=${adminPageIndex}`, data => {
			setSubThemes(data);
		})
	}

	return (
		<Layout title="Sub-Temas" titleIcon={subThemeIcon} cleanPage={true}>
			<AdminLayout activePage="subThemes" getValues={getSubThemes}>
				<AdminForm formMode="subThemes" />
				<AdminTable tableMode="subThemes" values={subThemes.data} />
				<ButtonsAdminPage count={subThemes.count} limit={subThemes.limit} />
			</AdminLayout>
		</Layout>
	)
}