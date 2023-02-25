export default interface User {
	id?: number;
	name: string;
	email: string;
	admin: boolean;
	imageUrl: string;
	iat: number;
	exp: number;
	token: string;
}