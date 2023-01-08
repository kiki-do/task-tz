export interface IAuth {
	auths: AuthItems;
	status: string;
}

export interface AuthItems {
	login: string;
	password: string;
}
