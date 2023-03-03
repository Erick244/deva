export default interface FormData {
	id?: number,
	name?: string,
	email?: string,
	password?: string,
	confirmPassword?: string,
	imageUrl?: string,
	userId?: number,
	categoryId?: number,
	themeId?: number,
	admin?: boolean,
	content?: string | null,
}