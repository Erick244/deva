import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { baseApiUrl } from "../global";
import User from "../models/User.model";
import ValueFromTable from "../models/ValueFromTable.model";
import { errorMessage } from "./Toastify";

interface StoreProps {
	visibleMenu: boolean;
	setVisibleMenu: Dispatch<SetStateAction<boolean>>;
	visibleContentBar: boolean;
	setVisibleContentBar: Dispatch<SetStateAction<boolean>>;
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
	valueFromTable: ValueFromTable;
	setValueFromTable: Dispatch<SetStateAction<ValueFromTable>>;
	categoryFormVisible: boolean;
	setCategoryFormVisible: Dispatch<SetStateAction<boolean>>;
	userFormVisible: boolean;
	setUserFormVisible: Dispatch<SetStateAction<boolean>>;
	themeFormVisible: boolean;
	setThemeFormVisible: Dispatch<SetStateAction<boolean>>;
	subThemeFormVisible: boolean;
	setSubThemeFormVisible: Dispatch<SetStateAction<boolean>>;
	createContentVisible: boolean;
	setCreateContentVisible: Dispatch<SetStateAction<boolean>>;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	currentCategoryId: number;
	setCurrentCategoryId: Dispatch<SetStateAction<number>>;
	currentThemeId: number;
	setCurrentThemeId: Dispatch<SetStateAction<number>>;
	adminOrRedirect: (callback: () => void) => void;
	mode: "delete" | "save";
	setMode: Dispatch<SetStateAction<"delete" | "save">>;
	currentSubThemeId: number;
	setCurrentSubThemeId: Dispatch<SetStateAction<number>>;
	colorTheme: "light" | "dark";
	setColorTheme: Dispatch<SetStateAction<"light" | "dark">>;
	adminLoading: boolean;
	setAdminLoading: Dispatch<SetStateAction<boolean>>;
	updatedCategory: boolean;
	setUpdateCategory: Dispatch<SetStateAction<boolean>>;
	updatedTable: boolean;
	setUpdateTable: Dispatch<SetStateAction<boolean>>;
	adminPageIndex: number;
	setAdminPageIndex: Dispatch<SetStateAction<number>>;

}

const StoreContex = createContext<StoreProps>({} as StoreProps);

export default function StoreProvider({ children }: any) {
	const [visibleMenu, setVisibleMenu] = useState<boolean>(true);
	const [visibleContentBar, setVisibleContentBar] = useState<boolean>(true);
	const [categoryFormVisible, setCategoryFormVisible] = useState<boolean>(false);
	const [userFormVisible, setUserFormVisible] = useState<boolean>(false);
	const [themeFormVisible, setThemeFormVisible] = useState<boolean>(false);
	const [subThemeFormVisible, setSubThemeFormVisible] = useState<boolean>(false);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<User>({} as User);
	const [valueFromTable, setValueFromTable] = useState<ValueFromTable>({} as ValueFromTable);
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
	const [currentThemeId, setCurrentThemeId] = useState<number>(0);
	const [createContentVisible, setCreateContentVisible] = useState<boolean>(false);
	const [mode, setMode] = useState<"delete" | "save">("save");
	const [currentSubThemeId, setCurrentSubThemeId] = useState<number>(0);
	const [isRouted, setIsRouted] = useState<boolean>(false)
	const [colorTheme, setColorTheme] = useState<"light" | "dark">("dark");
	const [adminLoading, setAdminLoading] = useState<boolean>(true);
	const [updatedCategory, setUpdateCategory] = useState<boolean>(false);
	const [updatedTable, setUpdateTable] = useState<boolean>(false);
	const [adminPageIndex, setAdminPageIndex] = useState<number>(1);
	const router = useRouter();
	let loadingValidateToken = false;

	const setUserFromLocalStorage = async () => {
		const userFromLocalStorage = localStorage.getItem("user");
		if (userFromLocalStorage) {
			const userParser = JSON.parse(userFromLocalStorage);
		if (userParser.id) {
				if (!loadingValidateToken) {
					loadingValidateToken = true;
					await validateToken(userParser, () => {
						setIsAuthenticated(true);
						setUser(userParser);
					});
				} else {
					return;
				}
			} else {
				setIsAuthenticated(false);
				if (!isRouted) {
					setIsRouted(true);
					return router.push("/auth");
				}
			}
		} else {
			setIsAuthenticated(false);
			if (!isRouted) {
				setIsRouted(true);
				return router.push("/auth");
			}
		}
	}

	const validateToken = async (userParser: User, finish: () => void) => {
		try {
			const resp = await axios.post(`${baseApiUrl}/validateToken`, userParser);
			const valid = await resp.data;
			if (valid) {
				axios.defaults.headers.common["Authorization"] = `bearer ${userParser.token}`;
				finish();
			} else {
				localStorage.removeItem("user");
				if (!isRouted) {
					setIsRouted(true);
					return router.push("/auth");
				}
			}
		} catch (err) {
			console.log(err);
			setIsAuthenticated(false);
			localStorage.removeItem("user");
			if (!isRouted) {
				setIsRouted(true);
				return router.push("/auth");
			}
		}

	}

	useEffect(() => {
		setUserFromLocalStorage();
	}, [user.id])

	function adminOrRedirect(callback: () => void) {
		if (user.admin) {
			callback();
			setAdminLoading(false);
		} else {
			if (!isRouted) {
				setIsRouted(true);
				errorMessage("Você não é um administrador.");
				return router.push("/");
			}
		}
	}

	return (
		<StoreContex.Provider
			value={{
				visibleMenu,
				setVisibleMenu,
				visibleContentBar,
				setVisibleContentBar,
				user,
				setUser,
				categoryFormVisible,
				setCategoryFormVisible,
				userFormVisible,
				setUserFormVisible,
				adminOrRedirect,
				valueFromTable,
				setValueFromTable,
				isAuthenticated,
				setIsAuthenticated,
				currentCategoryId,
				setCurrentCategoryId,
				themeFormVisible,
				setThemeFormVisible,
				subThemeFormVisible,
				setSubThemeFormVisible,
				currentThemeId,
				setCurrentThemeId,
				createContentVisible,
				setCreateContentVisible,
				mode,
				setMode,
				currentSubThemeId,
				setCurrentSubThemeId,
				colorTheme,
				setColorTheme,
				adminLoading,
				setAdminLoading,
				setUpdateCategory,
				updatedCategory,
				adminPageIndex,
				setAdminPageIndex,
				setUpdateTable,
				updatedTable
			}}
		>
			{children}
		</StoreContex.Provider>
	)
}

export const useStore = () => useContext(StoreContex);