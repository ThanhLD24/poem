import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {ICustomer} from '../../shared/model/customer.model';
import {createRequestOption} from '../../shared/util/request-util';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<ICustomer>;
type EntityArrayResponseType = HttpResponse<ICustomer[]>;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    private resourceUrl = SERVER_API_URL + 'api/customers';
    constructor(private http: HttpClient) { }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    create(customer: ICustomer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customer);
        return this.http
            .post<ICustomer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customer: ICustomer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customer);
        return this.http
            .put<ICustomer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.updatedDate = res.body.updatedDate != null ? moment(res.body.updatedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((customer: ICustomer) => {
            customer.createdDate = customer.createdDate != null ? moment(customer.createdDate) : null;
            customer.updatedDate = customer.updatedDate != null ? moment(customer.updatedDate) : null;
        });
        return res;
    }

    private convertDateFromClient(customer: ICustomer): ICustomer {
        const copy: ICustomer = Object.assign({}, customer, {
            createdDate: customer.createdDate != null && customer.createdDate.isValid() ? customer.createdDate.toJSON() : null,
            updatedDate: customer.updatedDate != null && customer.updatedDate.isValid() ? customer.updatedDate.toJSON() : null
        });
        return copy;
    }
}
