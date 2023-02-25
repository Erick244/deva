import axios from "axios";
import { useEffect, useState } from "react";
import { Theme } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import { themeIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import Loading from "../../components/view/Loading";
import { useStore } from "../../config/Store";
import { baseApiUrl } from "../../global";

export default function AdminUsers() {
	const [themes, setThemes] = useState<Theme[]>([] as Theme[]);

	async function getThemes() {
		const resp = await axios.get(`${baseApiUrl}/themes`);
		const data = await resp.data;
		setThemes(data);
	}

	return (
		<Layout title="Temas" titleIcon={themeIcon} cleanPage={true}>
			<AdminLayout activePage="themes" getValues={getThemes}>
				<AdminForm formMode="themes" />
				<AdminTable tableMode="themes" values={themes} />
			</AdminLayout>
		</Layout>
	)
}