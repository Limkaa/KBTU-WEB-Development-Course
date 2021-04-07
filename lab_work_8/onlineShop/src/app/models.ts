export interface Category {
	id: number;
	name: string;
}

export interface Product {
	id: number;
	name: string;
	category: Category;
	price: number;
	description: string;
	count: number;
	is_active: boolean;
	rating: number;
	likes: number;
	link: string;
	image_url: string;
}