import Aside from "../template/Aside";
import ContentBar from "../template/ContentBar";
import Header from "../template/Header";
import Main from "../template/Main";
import Menu from "../template/Menu";
import { useStore } from "../../config/Store";

import styles from "../../styles/Layout.module.css";
import { useLayoutEffect, useState } from "react";

interface LayoutProps {
	children: any;
	cleanPage?: boolean;
	title?: string;
	titleIcon?: JSX.Element;
	hideTitle?: boolean;
}

export default function Layout(props: LayoutProps) {
	const { visibleMenu, setVisibleMenu, setVisibleContentBar } = useStore();
	const [gridLayout, setGridLayout] = useState<string>("'header header header' 'aside main main' 'aside main main'");

	useLayoutEffect(() => {
		if (!props.cleanPage) {
			setVisibleContentBar(true);
			visibleMenu ?
			setGridLayout("'header header header' 'aside menu main' 'aside menu ContentBar'")
			: setGridLayout("'header header header' 'aside main main' 'aside ContentBar ContentBar'");
		} else {
			setVisibleMenu(false);
			setVisibleContentBar(false);
			setGridLayout("'header header header' 'aside main main' 'aside main main'");
		}
	}, [visibleMenu, props.cleanPage])

	return (
		<div className={styles.layout} style={{ gridTemplateAreas: gridLayout }}>
			<Header icon={props.titleIcon} title={props.title} hideTitle={props.hideTitle} />
			<Aside hideMenuIcon={!!props.cleanPage} />
			<Menu />
			<Main>
				{props.children}
			</Main>
			<ContentBar />
		</div>
	)
}