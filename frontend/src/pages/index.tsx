import { plusIcon } from "../components/view/Icons";
import Layout from "../components/view/Layout";
import Loading from "../components/view/Loading";
import { useStore } from "../config/Store";

import styles from "../styles/Home.module.css";

export default function Home() {
	const { setCategoryFormVisible, isAuthenticated } = useStore();

	return (
		<Layout cleanPage={true} hideTitle={true}>
			{!isAuthenticated ? (
				<Loading />
			) : (
				<div className={styles.home}>
					<h1>Developer <span>Annotation</span></h1>
					<p>Um APP simples e objetivo para auxiliar os desenvolvedores a fazerem anotações.</p>
					<hr />
					<div className={styles.letsGo}>
						<h2>Comece criando uma Categoria</h2>
						<button onClick={() => setCategoryFormVisible(true)}>
							{plusIcon}
						</button>
					</div>
				</div>
			)}
		</Layout>
	)
}
