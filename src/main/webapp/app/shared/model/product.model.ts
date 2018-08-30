import { ICategory } from 'app/shared/model//category.model';

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    categoryId?: number;
    pro_cate?: ICategory;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public categoryId?: number,
        public pro_cate?: ICategory
    ) {}
}
