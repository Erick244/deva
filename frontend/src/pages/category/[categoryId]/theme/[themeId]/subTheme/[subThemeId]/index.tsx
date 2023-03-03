import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Layout from "../../../../../../../components/view/Layout";
import parse from 'html-react-parser';
import { useStore } from "../../../../../../../config/Store";
import SubThemeModel from "../../../../../../../models/SubThemeModel.model";
import styles from "../../../../../../../styles/SubThemeContent.module.css";
import Loading from "../../../../../../../components/view/Loading";
import useCrud from "../../../../../../../hooks/useCrud";

export default function subThemeContent() {
	const router = useRouter();
	const { isAuthenticated, createContentVisible } = useStore();
	const [subTheme, setSubTheme] = useState<SubThemeModel>({} as SubThemeModel);
	const [content, setContent] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);
	const { get } = useCrud();

	useEffect(() => {
		if (router.query.subThemeId && isAuthenticated) {
			get(`userSubThemes/${router.query.subThemeId}`, data => {
				setSubTheme(_ => {
					if (data.content) {
						const buf = Buffer.from(data.content.data);
						setContent(parse(buf.toString()));
					} else {
						setContent("");
					}
					return data;
				});
				setLoading(false);
			})
		}
	}, [router.query.subThemeId, isAuthenticated, createContentVisible])

	return (
		<Layout title={`${subTheme.name}`} cleanPage={loading} hideTitle={loading}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.content}>
					{content}
				</div>
			)}
		</Layout>
	)
}