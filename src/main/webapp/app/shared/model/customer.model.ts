import {Moment} from 'moment';

export interface ICustomer {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    createdDate?: Moment;
    updatedDate?: Moment;
}

export class Customer implements ICustomer {
    constructor(public id?: number,
                public name?: string,
                public address?: string,
                public phone?: string,
                public createdDate?: Moment,
                public updatedDate?: Moment) {
    }
}
