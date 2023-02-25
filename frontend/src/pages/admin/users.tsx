import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import { usersIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import Loading from "../../components/view/Loading";
import { useStore } from "../../config/Store";
import { baseApiUrl } from "../../global";
import User from "../../models/User.model";

export default function AdminUsers() {
	const [users, setUsers] = useState<User[]>([] as User[]);
	const { adminOrRedirect, isAuthenticated } = useStore();

	async function getUsers() {
		const resp = await axios.get(`${baseApiUrl}/users`);
		const data = await resp.data;

		setUsers(data);
	}

	return (
		<Layout title="Usuários" titleIcon={usersIcon} cleanPage={true}>
			<AdminLayout activePage="users" getValues={getUsers}>
				<AdminForm formMode="users" />
				<AdminTable tableMode="users" values={users} />
			</AdminLayout>
		</Layout>
	)
}