import { editIcon, trashIcon } from "../../view/Icons";
import styles from "../../../styles/AdminTable.module.css";
import { useStore } from "../../../config/Store";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../global";

interface AdminTableProps {
	tableMode: "users" | "categories" | "themes" | "subThemes";
	values: any;
}

export default function AdminTable(props: AdminTableProps) {

	const { setValueFromTable } = useStore();
	const [tbody, setTbody] = useState<React.ReactNode[]>();

	const genThs = () => {
		switch (props.tableMode) {
			case "users":
				return (
					<>
						<th>E-mail</th>
						<th>Admin</th>
					</>
				)
			case "categories":
				return <th>ID do Usuário</th>;
			case "themes":
				return <th>ID da Categoria</th>;
			case "subThemes":
				return <th>ID do Tema</th>;
		}
	}

	const genTbody = async () => {
		setTbody(() => {
			return props.values.map((value: any, i: number) => {
				return (
					<tr key={i}>
						<td>{value.id}</td>
						<td>{value.name}</td>
						{props.tableMode === "users" ? (
							<>
								<td>{value.email}</td>
								<td>{String(value.admin)}</td>
							</>
						) : null}
						{props.tableMode === "categories" ? (
							<td>{value.userId}</td>
						) : null}
						{props.tableMode === "themes" ? (
							<td>{value.categoryId}</td>
						) : null}
						{props.tableMode === "subThemes" ? (
							<td>{value.themeId}</td>
						) : null}
						<td className={styles.containerButtons}>
							<button className={styles.edit} onClick={() => setAndGetValue(value.id, "update")}>
								{editIcon}
							</button>
							<button className={styles.delete} onClick={() => setAndGetValue(value.id, "delete")}>
								{trashIcon}
							</button>
						</td>
					</tr>
				)
			})
		})

	}

	const setAndGetValue = async (id: number, formAction: "update" | "delete" | "post") => {
		const resp = await axios.get(`${baseApiUrl}/${props.tableMode}/${id}`);
		const data = await resp.data;
		if (formAction !== "post" && data.content) {
			const convertContent = Buffer.from(data.content.data);
			data.content = convertContent.toString();
			setValueFromTable({...data, formAction});
			return;
		}
		setValueFromTable({ ...data, formAction });
	}

	useEffect(() => {
		genTbody();
	}, [props.values]);

	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					<th>ID</th>
					<th>Nome</th>
					{genThs()}
					<th>Ações</th>
				</tr>
			</thead>
			<tbody className={styles.tbody}>
				{tbody}
			</tbody>
		</table>
	)
}