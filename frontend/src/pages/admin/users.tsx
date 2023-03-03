import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import ButtonsPage from "../../components/admin/template/ButtonsAdminPage";
import { usersIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import { useStore } from "../../config/Store";
import useCrud from "../../hooks/useCrud";
import AdminData from "../../models/AdminData.model";

export default function AdminUsers() {
	const [users, setUsers] = useState<AdminData>({} as AdminData);
	const { adminPageIndex } = useStore();
	const { get } = useCrud();

	function getUsers() {
		get(`users?page=${adminPageIndex}`, data => {
			setUsers(data);
		})
	}

	return (
		<Layout title="Usuários" titleIcon={usersIcon} cleanPage={true}>
			<AdminLayout activePage="users" getValues={getUsers}>
				<AdminForm formMode="users" />
				<AdminTable tableMode="users" values={users.data} />
				<ButtonsPage count={users.count} limit={users.limit} />
			</AdminLayout>
		</Layout>
	)
}