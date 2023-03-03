import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import ButtonsAdminPage from "../../components/admin/template/ButtonsAdminPage";
import { themeIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import AdminData from "../../models/AdminData.model";

export default function AdminUsers() {
	const [themes, setThemes] = useState<AdminData>({} as AdminData);
	const { adminPageIndex } = useStore();
	const { get } = useCrud();

	function getThemes() {
		get(`themes?page=${adminPageIndex}`, data => {
			setThemes(data);
		})
	}

	return (
		<Layout title="Temas" titleIcon={themeIcon} cleanPage={true}>
			<AdminLayout activePage="themes" getValues={getThemes}>
				<AdminForm formMode="themes" />
				<AdminTable tableMode="themes" values={themes.data} />
				<ButtonsAdminPage count={themes.count} limit={themes.limit} />
			</AdminLayout>
		</Layout>
	)
}