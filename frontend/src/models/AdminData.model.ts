import { Theme } from 'react-toastify';
import Category from "./Category.model";
import SubThemeModel from './SubThemeModel.model';
import User from "./User.model";

export default interface AdminData {
	data: Category[] | User[] | Theme[] | SubThemeModel[],
	count: number,
	limit: number
}