export interface Account {
	id: number;
	name: string;
	phone: string;
	username: string;
	address: string;
	subscription: number;
	wishes: Array<Wish>;
}

export interface Comment {
	id: number;
	email: string;
	content: string;
}

export interface Payment {
	id: number;
	amount: number;
	method: string;
	days: number;
}

export interface AuthToken {
	token: string;
}

export interface ResponseMessage {
	message: string;
}

export interface Wish {
	id: number,
	text: string
}