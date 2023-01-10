export interface IItems {
	items: ItemsType[];
	status: string;
	search: string;
}

export type ItemsType = {
	id: number;
	avatar: string;
	name: string;
	surname: string;
	hobby: string;
	isOpen: boolean;
	fullname: string;
};
