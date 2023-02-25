import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminForm from "../../components/admin/template/AdminForm";
import AdminTable from "../../components/admin/template/AdminTable";
import { subThemeIcon } from "../../components/view/Icons";
import Layout from "../../components/view/Layout";
import Loading from "../../components/view/Loading";
import { useStore } from "../../config/Store";
import { baseApiUrl } from "../../global";
import SubThemeModel from "../../models/SubThemeModel.model";

export default function AdminUsers() {
	const [subThemes, setSubThemes] = useState<SubThemeModel[]>([] as SubThemeModel[]);
	async function getSubThemes() {
		const resp = await axios.get(`${baseApiUrl}/subThemes`);
		const data = await resp.data;
		setSubThemes(data);
	}

	return (
		<Layout title="Sub-Temas" titleIcon={subThemeIcon} cleanPage={true}>
			<AdminLayout activePage="subThemes" getValues={getSubThemes}>
				<AdminForm formMode="subThemes" />
				<AdminTable tableMode="subThemes" values={subThemes} />
			</AdminLayout>
		</Layout>
	)
}