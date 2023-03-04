import { arrowDownIcon, editIcon, trashIcon } from "../../view/Icons";
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
	const [sortableBy, setSortableBy] = useState<"id" | "name" | "email" | "userId" | "categoryId" | "admin" | "themeId" | null>(null);
	const [values, setValues] = useState([]);
	const [reverse, setReverse] = useState<boolean>(true);
	const { get } = useCrud();

	const genThs = () => {
		switch (props.tableMode) {
			case "users":
				return (
					<>
						<th>
							<i
								className="v-middle"
								style={{ transform: `${sortableBy === "email" ? "rotate(180deg)" : "rotate(0deg)"}` }}
								onClick={() => sortValues("email", "string", reverse)}>
								{arrowDownIcon}
							</i> E-mail
						</th>
						<th>
							<i
								className="v-middle"
								style={{ transform: `${sortableBy === "admin" ? "rotate(180deg)" : "rotate(0deg)"}` }}
								onClick={() => sortValues("admin", "boolean", reverse)}>
								{arrowDownIcon}
							</i> Admin
						</th>
					</>
				)
			case "categories":
				return <th>
					<i
						className="v-middle"
						style={{ transform: `${sortableBy === "userId" ? "rotate(180deg)" : "rotate(0deg)"}` }}
						onClick={() => sortValues("userId", "number", reverse)}>
						{arrowDownIcon}
					</i> ID do Usuário
				</th>;
			case "themes":
				return <th> <i
					className="v-middle"
					style={{ transform: `${sortableBy === "categoryId" ? "rotate(180deg)" : "rotate(0deg)"}` }}
					onClick={() => sortValues("categoryId", "number", reverse)}>
					{arrowDownIcon}
				</i> ID da Categoria</th>;
			case "subThemes":
				return <th> <i
					className="v-middle"
					style={{ transform: `${sortableBy === "themeId" ? "rotate(180deg)" : "rotate(0deg)"}` }}
					onClick={() => sortValues("themeId", "number", reverse)}>
					{arrowDownIcon}
				</i> ID do Tema</th>;
		}
	}

	const genTbody = async () => {
		const tbodys = values?.map((value: any, i: number) => {
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
		if (props.values) setValues(props.values);
		if (values) genTbody();
	}, [props.values, updatedTable]);

	const sortValues = (
		valueType: "id" | "name" | "admin" | "userId" | "categoryId" | "themeId" | "email",
		primitiveType: "string" | "number" | "boolean",
		sort: boolean
	) => {
		type NumberValues = {
			id: number,
			userId: number,
			themeId: number,
			categoryId: number
		}
		
		setSortableBy(valueType);

		function sortNumbers(a: NumberValues, b: NumberValues) {
			switch (valueType) {
				case "id":
					return a.id - b.id;
				case "themeId":
					return a.themeId - b.themeId;
				case "categoryId":
					return a.categoryId - b.categoryId;
				case "userId":
					return a.userId - b.userId;
			}
		}

		type StringValues = {
			name: string,
			email: string
		}

		function sortString(a: StringValues, b: StringValues) {
			if (valueType === "name") {
				return a.name > b.name ? 1 : -1;
			} else {
				return a.email > b.email ? 1 : -1;
			}
		}

		let newValues = [];

		if (primitiveType === "number") {
			newValues = values.sort(sortNumbers);
		} else if (primitiveType === "string") {
			newValues = values.sort(sortString);
		} else {
			newValues = values.sort((a: any, b: any) => b.admin - a.admin);
		}

		setReverse(!reverse);
		if (!reverse) setSortableBy(null);

		sort ? setValues(newValues) : setValues(newValues.reverse());

		genTbody();
		console.log(values);
	}


	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					<th>
						<i
							className="v-middle"
							style={{ transform: `${sortableBy === "id" ? "rotate(180deg)" : "rotate(0deg)"}` }}
							onClick={() => sortValues("id", "number", reverse)}
						>
							{arrowDownIcon}
						</i> ID
					</th>
					<th>
						<i
							className="v-middle"
							style={{ transform: `${sortableBy === "name" ? "rotate(180deg)" : "rotate(0deg)"}` }}
							onClick={() => sortValues("name", "string", reverse)}
						>
							{arrowDownIcon}
						</i> Nome
					</th>
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