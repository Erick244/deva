import { useStore } from "../config/Store";

export default function useColorTheme() {
	const { colorTheme, setColorTheme } = useStore();


	function alternateTheme() {
		if (colorTheme === "dark") {
			setColorTheme("light");
			document.documentElement.style.setProperty("--bg-color", "#afa2b1");
			document.documentElement.style.setProperty("--bg-color2", "#9b93a1");
			document.documentElement.style.setProperty("--bg-color3", "#8e8596");
			document.documentElement.style.setProperty("--color1", "#55254a");
			document.documentElement.style.setProperty("--color2", "#69345d");
			document.documentElement.style.setProperty("--color3", "#575658");
		} else {
			setColorTheme("dark");
			document.documentElement.style.setProperty("--bg-color", "#21212b");
			document.documentElement.style.setProperty("--bg-color2", "#181820");
			document.documentElement.style.setProperty("--bg-color3", "#17171f");
			document.documentElement.style.setProperty("--color1", "#894379");
			document.documentElement.style.setProperty("--color2", "#b65ba1");
			document.documentElement.style.setProperty("--color3", "#6d6374");
		}
	}

	return {
		alternateTheme
	}

}