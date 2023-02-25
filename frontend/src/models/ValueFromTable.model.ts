export default interface ValueFromTable {
	id?: number;
	name: string;
	email?: string;
	admin?: boolean;
	imageUrl?: string;
	content?: string;
	userId?: number;
	categoryId?: number;
	themeId?: number;
	formAction?: "post" | "update" | "delete";
}