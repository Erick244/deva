import { editIcon, trashIcon } from "../../view/Icons";
import styles from "../../../styles/AdminTable.module.css";
import { useStore } from "../../../config/Store";
import { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";

interface AdminTableProps {
	tableMode: "users" | "categories" | "themes" | "subThemes";
	values: any;
}

export default function AdminTable(props: AdminTableProps) {

	const { setValueFromTable, updatedTable } = useStore();
	const [tbody, setTbody] = useState<React.ReactNode[]>();
	const { get } = useCrud();

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
		const tbodys = await props.values?.map((value: any, i: number) => {
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
		setTbody(tbodys);
	}

	const setAndGetValue = (id: number, formAction: "update" | "delete" | "post") => {
		get(`${props.tableMode}/${id}`, value => {
			if (formAction !== "post" && value.content) {
				const convertContent = Buffer.from(value.content.data);
				value.content = convertContent.toString();
				setValueFromTable({ ...value, formAction });
				return;
			}
			setValueFromTable({ ...value, formAction });
		})

	}

	useEffect(() => {
		genTbody();
	}, [props.values, updatedTable]);

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