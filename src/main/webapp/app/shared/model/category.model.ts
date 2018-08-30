import { Moment } from 'moment';

export interface ICategory {
    id?: number;
    name?: string;
    description?: string;
    createdDate?: Moment;
    updatedDate?: Moment;
}

export class Category implements ICategory {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public createdDate?: Moment,
        public updatedDate?: Moment
    ) {}
}
