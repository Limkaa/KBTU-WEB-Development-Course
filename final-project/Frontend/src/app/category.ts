export interface Category {
	id: number;
	title: string;
}
export interface Product {
	id: number;
	title: string;
    description :string;
    image : string;

    category: Category;
    detail:string;
    ingredients:string;
    notes:string;
    is_active :string;
}